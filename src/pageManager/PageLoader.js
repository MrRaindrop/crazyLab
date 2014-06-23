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
			console.error('Load page callback must be a function.');
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
		this._callbacks[pageDir] = [cb];
		console.log('Loading Page ' + pageDir + ' manifest ' + configPath);
		var self = this;
		require([configPath], function(cfg) {
			var cfg = JSON.parse(cfg);
			self._loadPageRes(cfg, pageDir);
		}, function(err) {
			console.error('Failed to load modules:', err.requireModules, err.message);
			cb(null, err);
		});
	};

	PageLoader.prototype._loadPageRes = function(cfg, pageDir) {
		if (!cfg.html && !cfg.js) {
			console.error('Html or js file is needed for page ' + pageDir + '.');
			return;
		}
		var html = cfg.html,
			css = cfg.css || [],
			pageClass = cfg.js,
			requiredPaths = [],
			self = this;

		html && (requiredPaths.push(this._getRequiredPath(pageDir + '/' + html, true)));
		pageClass && (requiredPaths.push(this._getRequiredPath(pageDir + '/' + pageClass)));
		for (var i = 0, l = css.length; i < l; i++) {
			requiredPaths.push(this._getRequiredPath(pageDir + '/' + css[i], true));
		}

		// require resouces.
		require(requiredPaths, function() {
			var htmlText, PageFunc, cssArr = [];
			var idx = 0;
			html && (htmlText = arguments[idx++]);
			if (pageClass) {
				PageFunc = arguments[idx++];
			} else {
				PageFunc = Page;
			}
			while(idx < arguments.length) {
				cssArr.push(arguments[idx++]);
			}

			self._initLoadedPage({
				html: htmlText,
				PageFunc: PageFunc,
				css: cssArr,
				pageDir: pageDir,
			});
		});
	};

	/**
	 * if the file type is not js, use !text plugin to load it.
	 * @param  {String} res    [relative path, e.g. 'page/PostList/index.js']
	 * @param  {Boolean} isText [is it no-js-file?]
	 * @return {String}      [path for requireJs (and text.js)]
	 */
	PageLoader.prototype._getRequiredPath = function(res, isText) {
		isText && (isText = 'text!');
		console.log((isText || '') + this.PAGES_DIR + '/' + res);
		return (isText || '') + this.PAGES_DIR + '/' + res;
	}

	/**
	 * instantiate the PageClass and do some startup things:
	 * init page.html, page.uri, and add css styles to head element.
	 * @param  {Object} opt [opt{'html','css','PageFunc','pageDir'}].
	 */
	PageLoader.prototype._initLoadedPage = function(opt) {
		var html = opt.html || '',
			css = opt.css || [],
			PageFunc = opt.PageFunc || Page,
			pageDir = opt.pageDir,
			cbs = this._callbacks[pageDir],
			page = new PageFunc();

		html && (page.html = html);
		page.uri = pageDir;
		for (var i = 0, l = css.length; i < l; i++) {
			addStyle(css[i]);
		}
		for (var i = 0, l = cbs.length; i < l; i++) {
			cbs[i](page);
		};
		delete this._callbacks[pageDir];
	}

	return PageLoader;

});