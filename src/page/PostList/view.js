define(function(require) {

	var html = require('text!./template.html'),
		Backbone = require('backbone'),
		_ = require('underscore');

	var View = Backbone.View.extend({

		initialize: function(model) {
			var ct = model.dom,
				_template = _.template(html),
				html = _template({title: 'Hello You Crazy People!'});
			this.model = model;
			console.log('view model:', model);
			// ct.innerHTML = _.template(html, {});
		}

	});

	return  View;

});