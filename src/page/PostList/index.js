define(function(require) {

	var View = require('view'),
		Backbone = require('backbone'),
		_ = require('underscore');

	var PostList = Backbone.Model.extend({

		constructor: function() {
			console.log('PostList constructor!');
		},

		initialize: function() {
			console.log('PostList initialize!');
			this.view = new View(this);
		},

	});

	return PostList;

});