define(function(require) {

	var _ = require('underscore'),
		$ = require('jquery'),
		router = require('module/router'),
		Page = require('pageManager/Page'),
		inherit = require('util/inherits'),
		HeaderUI = require('ui/header/Header'),
		FooterUI = require('ui/footer/Footer');

	var User = function() {
		Page.call(this);
	};

	inherits(User, Page);

	User.prototype.onCreate = function() {
		this.dom = document.createElement('div');
		// test
		var json = require('text!../../../data/user.json');
		// console.log(json);
		var res = JSON.parse(json);
		console.log(res);
		// console.log(JSON.parse(require('text!../../../data/postlist.json')));
		// var res = JSON.parse(require('text!../../../data/postlist.json')).res;
		var template = _.template(this.html, res);
		this.dom.innerHTML = template;
		this.$d = $(this.dom);
		this.headerUI = new HeaderUI(this.$d.find('.header')[0], {});
		this.footerUI = new FooterUI(this.$d.find('.footer')[0], {});
		this.addEvents();
		this.onShow();
	};

	User.prototype.addEvents = function() {
		this.$d.find('li.post').on('tap', _.bind(this.onPostTapped, this));
	};

	User.prototype.onPostTapped = function(e) {
		var _t = $(e.target), id;
		if (_t.hasClass('title')) {
			_t = _t.closest('li.post');
			id = _t.attr('data-id');
			console.log('go to post page, id:', id);
			router.setRoute('post', { 'id': id });
		} else {
			
		}
	};

	User.prototype.onShow = function() {
		this.$d.css('display', 'block');
	};

	User.prototype.onHide = function() {
		this.$d.css('display', 'none');
	};

	return User;

});