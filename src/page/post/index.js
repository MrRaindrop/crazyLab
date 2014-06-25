define(function(require) {

	var _ = require('underscore'),
		$ = require('jquery'),
		router = require('module/router'),
		Page = require('pageManager/Page'),
		inherit = require('util/inherits'),
		HeaderUI = require('ui/header/Header'),
		FooterUI = require('ui/footer/Footer');

	var Post = function() {
		Page.call(this);
	};

	inherits(Post, Page);

	Post.prototype.onCreate = function() {
		this.dom = document.createElement('div');
		// test
		var json = require('text!../../../data/post.json');
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
	};

	Post.prototype.addEvents = function() {
		// this.$d.find('li.post').on('tap', _.bind(this.onAuthorTapped, this));
	};

	Post.prototype.onShow = function() {

	};

	Post.prototype.onHide = function() {
		this.$d.css('display', 'none');
	};

	return Post;

});