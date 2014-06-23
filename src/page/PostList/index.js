define(function(require) {

	var View = require('./view'),
		Backbone = require('backbone'),
		_ = require('underscore');

	var PostList = Backbone.Model.extend({

		// constructor: function() {
		// 	console.log('PostList constructor!');
		// },

		initialize: function() {
			this.dom = document.createElement('div');
			console.log('PostList initialize!');
			this.view = new View(this);
		},

		onCreate: function() {
			alert('on postlist create!');
		},

		onShow: function() {
			alert('on postlist show!');
		},

		onHide: function() {
			alert('on postlist hide!');
		}
 	});

	return PostList;

});