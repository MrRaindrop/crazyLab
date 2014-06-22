define(function(require) {

	var _ = require('underscore'),
		Page = require('./Page'),
		addStyle = require('util/addStyle');

	var instance = null;

	var PageLoader = function() {
		if (!instance) {
			instance = this;
		}
		this._callbacks = {};
		return instance;
	};

	PageLoader.prototype.PAGES_DIR = 'page';
	PageLoader.prototype.PAGE_CONF_FILE = 'page.json';
	// PageLoader.prototype.CURRENT_PAGE_CLASS_NAME = 'current_page';

	PageLoader.prototype.load = function(pageDir, cb) {
		if (!_.isFunction(cb)) {
			console.error('Pageloader.load:Load page callback must be a function.');
			return;
		}
		var cbs = this._callbacks[pageDir];
		if (cbs) {
			cbs.push(cb);
			return;
		}
		// if callbacks of pageDir is already exsits, then the page assets has already
		// been loaded. else load the page assets discripted in the PAGE_CONF_FILE.
		var PAGES_DIR = this.PAGES_DIR,
			PAGE_CONF_FILE = this.PAGE_CONF_FILE,
			configPath = 'text!' + PAGES_DIR + '/' + pageDir + '/' + PAGE_CONF_FILE;
		this.callbacks[pageDir] = [cb];
		console.log('');
	};

	return PageLoader;

});