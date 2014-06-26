define([
	'config',
	'backbone',
	'pageManager/PageManager',
	'module/router',
], function (
	config,
	Backbone,
	PageManager,
	router
) {

	var App = function(ct) {
		console.log('new App container dom:', ct);
		this.version = '0.0.1';
		this.pageContainer = ct;
		this.init();
	};

	App.prototype.init = function() {

		this.pm = new PageManager(this.pageContainer, this);
		router.set('pageManager', this.pm);
		router.on('change:page', function(opt) {
			this.pm.goto(opt.page);
		}, this);

		router.start();

		// var Router = Backbone.Router.extend({

		// 	routes: {
		// 		'postlist/:tag1/:tag2': 'postlist',
		// 		'post/:tag1/:tag2/:pId': 'post'
		// 	},
			
		// 	postlist: function(tag1, tag2) {
		// 		console.log('postlist', tag1, tag2);
		// 	},

		// 	post: function(tag1, tag2, pId) {
		// 		console.log('post', tag1, tag2, pId);
		// 	}
		// });

		// this.router = new Router();
		// Backbone.history.start({ pushState: true, root: 'proj1/index.html#' });

		// var h = config.home,
		// 	hr = h.page,
		// 	hr2 = '';

		// for (var key in h.data) {
		// 	hr2 += '/' + h.data[key];
		// }
		// hr += hr2;

		// this.router.navigate(hr, { 'trigger': true });

	};

	App.prototype.catchError = function() {
		window.addEventListener('error', function(err) {
			console.error('Catch page exception:', err);
		}, false);
	};

	return App;

});