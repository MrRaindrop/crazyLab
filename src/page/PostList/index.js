define(function(require) {

	var _ = require('underscore'),
		$ = require('jquery'),
		router = require('module/router'),
		Page = require('pageManager/Page'),
		inherit = require('util/inherits'),
		HeaderUI = require('ui/header/Header'),
		FooterUI = require('ui/footer/Footer');

	var PostList = function() {
		Page.call(this);
	};

	inherits(PostList, Page);

	PostList.prototype.onCreate = function() {
		this.dom = document.createElement('div');
		// test
		var json = require('text!../../../data/postlist.json');
		// console.log(json);
		var res = JSON.parse(json);
		console.log(res);
		// console.log(JSON.parse(require('text!../../../data/postlist.json')));
		// var res = JSON.parse(require('text!../../../data/postlist.json')).res;
		var template = _.template(this.html, {
			list: res.results
		});
		this.dom.innerHTML = template;
		this.$d = $(this.dom);
		this.headerUI = new HeaderUI(this.$d.find('.header')[0], {});
		this.footerUI = new FooterUI(this.$d.find('.footer')[0], {});
		this.addEvents();
		this.onShow();
	};

	PostList.prototype.addEvents = function() {
		this.$d.find('li.post').on('tap', _.bind(this.onAuthorTapped, this));
	};

	PostList.prototype.onAuthorTapped = function(e) {
		var _t = $(e.target), id;
		if (_t.hasClass('author')) {
			id = _t.attr('data-id');
			console.log('go to user page id:', id);
			// router.setRoute('user', { 'id': id });
		} else {
			_t = _t.closest('li.post');
			id = _t.attr('data-id');
			console.log('go to post page, id:', id);
			router.setRoute('post', { 'id': id });
		}
	};

	PostList.prototype.onShow = function() {
		this.$d.css('display', 'block');
	};

	PostList.prototype.onHide = function() {
		this.$d.css('display', 'none');
	};

	return PostList;

});