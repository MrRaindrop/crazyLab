define(function(require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		config = require('config'),
		routes = {},
		rt, str,
		router = null;

	for (var i = 0, l = config.routes.length; i < l; i++) {
		rt = config.routes[i];
		str = rt.page;
		for (var j = 0, m = rt.keys.length; j < m; j++) {
			str += '/:' + rt.keys[j];
		}
		routes[str] = rt.page;
	}

	var Router = Backbone.Router.extend({
		routes: routes,
	});

	Router.prototype.start = function() {
		Backbone.history.start({ pushState: true, root: config.root });
	};

	Router.prototype.setRoute = function(page, data) {

	};

	if (!router) {
		router = new Router();
	}

	return router;

});