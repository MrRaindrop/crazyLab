define(function(require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery'),
		config = require('config'),
		routes = {},
		rt, str,
		router = null;

	var RouterModel = Backbone.Model.extend({

		defaults: {
			router: null,
			/**
			 * routes:
			 * { page: '',
			 *   keys: [],
			 *   data: {} }
			 */
			routes: {}
		},

		initialize: function() {
			this.set('router', new Backbone.Router());
			var rt, str,
				routes = this.get('routes'),
				router = this.get('router');
			for (var i = 0, l = config.routes.length; i < l; i++) {
				rt = config.routes[i];
				routes[rt.page] = { data:{} };
				_.extend(routes[rt.page], rt);
				str = rt.page;
				for (var j = 0, m = rt.keys.length; j < m; j++) {
					str += '/:' + rt.keys[j];
				}
				// e.g. router.route('postlist/:tag1/:tag2', 'postlist');
				router.route(str, rt.page);
			}
			this.get('router').on('route', this.onRoute);
		},

		start: function() {
			Backbone.history.start({ pushState: true, root: config.root });
			if (!location.hash && config.home) {
				this.setHome();
			}
		},

		setHome: function() {
			if (!config.home) {
				console.error('error:config has no home property.must have one.');
				return;
			}
			this.setRoute(config.home.page, config.home.data);
		},

		/**
		 * set current route. trigger 'route' event of Backbone.Router.
		 * @param {String} page [e.g. 'postlist']
		 * @param {Object} data [e.g. { tag1: 'coder', tag2: 'life' }]
		 * @param {Object} opt  [{ trigger:xx, replace:xx }]
		 */
		setRoute: function(page, data, opt) {
			var rt = this.get('routes')[page],
				uri = page,
				routeOpt = {
					trigger: true,
					replace: false
				};

			if (!rt || !rt.data) {
				console.error('error:no match route of page ' + page);
				return;
			}
			_.each(rt.keys, function(k, i, ks) {
				uri += '/' + encodeURIComponent(data[k]);
			});
			opt && _.extend(routeOpt, opt);
			console.log('navigate to uri:', uri);
			this.get('router').navigate(uri, opt);
		},

		onRoute: function(page, dataArr) {
			console.log('onRoute-> page:', page, 'dataArr:', dataArr);
			var rt = this.get('routes')[page],
				isPageChanged = false,
				oldPage = this.get('currentPage'),
				changedKeys = [],
				self = this;

			if (route) {
				if (page === oldPage) {
					_.each(rt.keys, function(k, i, ks) {
						if (rt.data[k] !== dataArr[i]) {
							rt.data[k] = decodeURIComponent(dataArr[i]);
							changedKeys.push(k);
							self.trigger('change:' + page + ':' + k, rt.data[k]);
						}
					});
				} else {
					isPageChanged = true;
					self.set('currentPage', page);
					changedKeys = rt.keys.concat();
				}
				this.trigger('change:route', {
					isPageChanged: isPageChanged,
					route: _.extend({}, route),
					changedKeys: changedKeys
				});
				isPageChanged && this.trigger('change:page', {
					oldPage: oldPage,
					page: page,
					route: route
				});
			} else {
				console.error('error:no match route of page ' + page);
			}
		},

		getCurrentPage: function() {
			return this.get('currentPage');
		},

		getCurrentRoute: function() {
			var rt = this.get('routes')[this.getCurrentPage()];
			if (rt) {
				return _.extend({}, rt);
			}
		}

	});

	if (!router) {
		router = new RouterModel();
	}

	console.log('in router.js router:', router);
	return router;

});