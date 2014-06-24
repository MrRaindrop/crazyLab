define(function(require) {

	var _ = require('underscore'),
		$ = require('jquery'),
		Page = require('pageManager/Page'),
		inherit = require('util/inherits');

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
	};

	PostList.prototype.onShow = function() {

	};

	PostList.prototype.onHide = function() {

	};

	return PostList;

});