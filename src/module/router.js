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
			routes: {},
			hist: {	// history
				hash: [],
				idx: -1
			}
		},

		initialize: function() {
			this.set('router', new Backbone.Router());
			var rt, str, self = this,
				routes = this.get('routes'),
				router = this.get('router');
			for (var i = 0, l = config.routes.length; i < l; i++) {
				rt = config.routes[i];
				routes[rt.page] = { data:{} };
				_.extend(routes[rt.page], rt);
				str = rt.page;
				if (rt.keys) {
					for (var j = 0, m = rt.keys.length; j < m; j++) {
						str += '/:' + rt.keys[j];
					}
				} else {
					str += '/'
				}
				// e.g. router.route('postlist/:tag1/:tag2', 'postlist');
				router.route(str, rt.page);
			}
			router.on('route', this.onRoute, this);
			window.addEventListener('hashchange', _.bind(this.onHashchange, this), false);
	        window.addEventListener('beforeonload', _.bind(this.onBeforeonload, this), false);
		},

		// when browser history back or forward.
		onHashchange: function() {
			console.log('onhashchange event!');
			var hash = decodeURIComponent(location.hash),
				hist = this.get('hist');
        	hash.charAt(0) === '#' && (hash = hash.substr(2));

        	// tell if back or forward in history line.
        	if (hash === hist.hash[hist.idx - 1]) {
        		this.back();
        	} else if (hash === hist.hash[hist.idx + 1]) {
        		this.forward();
        	}   	
		},

		onBeforeonload: function() {
			alert('确定要退出？');
		},

		start: function() {
			Backbone.history.start({ pushState: true, root: config.root });
			console.log('config', config);
			var path = location.hash.substr(2),
				pg = path.substr(0, path.indexOf('/')),
				keys, rt = this.get('routes')[pg],
				routeOpt = {
					trigger: true,
					replace: false
				};
			if (!location.hash && !rt && config.home) {
				this.setHome();
			} else if (location.hash && rt) {
				keys = rt.keys;
				this.get('router').navigate(location.hash.substr(2), routeOpt);
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
			if (rt.keys) {
				_.each(rt.keys, function(k, i, ks) {
					uri += '/' + encodeURIComponent(data[k]);
				});
			} else {
				uri += '/'
			}
			opt && _.extend(routeOpt, opt);
			console.log('navigate to uri:', uri);
			this.get('router').navigate(uri, routeOpt);
		},

		/**
		 * translate:
		 * '/postlist/code/life' to {
		 * 	uri: 'postlist',
		 * 	data: {
		 * 			'tag1': code,
		 * 			'tag2': postlist
		 * 		},
		 * 	keys: ['tag1', 'tag2']
		 * }
		 */
		uriToPage: function(hash) {
			var arr = hash.split('/'),
				pgStr = arr[0],
				pg = { data: {}, keys: [] },
				route = this.get('routes')[pgStr];
			if (route) {
				console.log('route', route);
				pg.uri = pgStr;
				_.each(route.keys, function(k, i, ks) {
					pg.data[k] = arr[i+1];
					pg.keys.push(k);
				});
				return pg;
			} else {
				console.error('page is not in config.');
			}
		},

		back: function() {
			var hist = this.get('hist'),
				hash = hist.hash[hist.idx - 1],
				pg = this.uriToPage(hash),
				dataArr = [];
			hist.idx--;
			_.each(pg.keys, function(k, i, ks) {
				dataArr.push[pg.data[k]];
			});
			this.onRoute(pg.uri, dataArr, true);
		},

		forward: function() {
			var hist = this.get('hist'),
				hash = hist.hash[hist.idx + 1],
				pg = this.uriToPage(hash),
				dataArr = [];
			hist.idx++;
			_.each(pg.keys, function(k, i, ks) {
				dataArr.push[pg.data[k]];
			});
			this.onRoute(pg.uri, dataArr, true);
		},

		// noAddToHist: true or null/undefined.
		onRoute: function(page, dataArr, noAddToHist) {
			console.log('onRoute-> page:', page, 'dataArr:', dataArr);
			console.log(this.get('routes'));
			var rt = this.get('routes')[page],
				isPageChanged = false,
				oldPage = this.get('currentPage'),
				changedKeys = [],
				self = this,
				hash = page,
				hist = this.get('hist');

			if (!noAddToHist) {
				console.log('hashs', this.get('hist').hash);
				if (hist.idx < hist.hash.length - 1) {
					hist.hash.splice(hist.idx + 1);
				}
				_.each(dataArr, function(d, i, arr) {
					d && (hash += '/' + d);
				});
				hist.hash.push(decodeURIComponent(hash));
				hist.idx++;
				console.log('hashs', this.get('hist').hash);
			}

			if (rt) {
				if (page === oldPage) {
					if (rt.keys) {
						_.each(rt.keys, function(k, i, ks) {
							if (rt.data[k] !== dataArr[i]) {
								rt.data[k] = decodeURIComponent(dataArr[i]);
								changedKeys.push(k);
								self.trigger('change:' + page + ':' + k, rt.data[k]);
							}
						});
					}
				} else {
					isPageChanged = true;
					self.set('currentPage', page);
					rt.keys && (changedKeys = rt.keys.concat());
				}
				this.trigger('change:route', {
					isPageChanged: isPageChanged,
					route: _.extend({}, rt),
					changedKeys: changedKeys
				});
				isPageChanged && this.trigger('change:page', {
					oldPage: oldPage,
					page: page,
					route: rt
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