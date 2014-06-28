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
		this.bindGlobalEvents();
		router.start();

	};

	App.prototype.bindGlobalEvents = function() {
		// $('.touch-highlight').live('tap', function(e) {
		// 	var _t = $(e.target);
		// 	_t.addClass('highlight');
		// 	setTimeout(function() {
		// 		_t.removeClass('highlight');
		// 	}, 200);
		// });
	};

	App.prototype.catchError = function() {
		window.addEventListener('error', function(err) {
			console.error('Catch page exception:', err);
		}, false);
	};

	return App;

});