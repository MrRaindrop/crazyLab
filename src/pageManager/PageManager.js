define(function(require) {

	var _ = require('underscore'),
		PageLoader = require('./PageLoader');

	var PageManager = function(pageContainer, appContext) {
		this._pageLoader = new PageLoader();
		this._pageContainer = pageContainer;
		this.context = appContext;
		this._pages = {};
		this._currentPage = null;

		// use this for callbacks. bind with this PageManager instance.
		// e.g. callback in method 'goto', pageLoader.load(). 
		this._onPageLoaded = _.bind(this._onPageLoaded, this);
	};

	PageManager.prototype.PAGES_DIR = 'page';
	PageManager.prototype.PAGE_CONF_FILE = 'page.json';
	PageManager.prototype.CURRENT_PAGE_CLASS_NAME = 'current_page';

	/**
	 * goto page xxx with page name, only if it's in _pages cache.
	 * else will load it and create it by _pageLoader.load().
	 * @param  {String} pageName pageName str.
	 * parameter page: e.g. 'postlist'.
	 */
	PageManager.prototype.goto = function(pageName) {
		var p = this._pages[pageName];
		if (p) {
			this._hideCurrentPage();
			this._currentPage = p;
			p.dom.classList.add(this.CURRENT_PAGE_CLASS_NAME);
			p.onShow();
		} else {
			this._pageLoader.load(pageName, this._onPageLoaded);
		}
	};

	/**
	 * call this once the page is loaded and instantiated.
	 * @param  {Object} page Instance of Page object.
	 */
	PageManager.prototype._onPageLoaded = function(page) {
		// add this page to the _pages cache.
		this._pages[page.uri] = page;
		page.onCreate(this);
		this._pageContainer.appendChild(page.dom);
		this.goto(page.uri);
	};

	PageManager.prototype.back = function() {

	};

	PageManager.prototype._hideCurrentPage = function() {
		if (!this._currentPage) {
			return;
		}
		this._currentPage.dom.classList.remove(this.CURRENT_PAGE_CLASS_NAME);
		this._currentPage.onHide();
	};

	return PageManager;

});