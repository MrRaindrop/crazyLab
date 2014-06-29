define(function(require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery'),
		config = require('config'),
		routes = {},
		rt, str,
		user = null;

	var UserModel = Backbone.Model.extend({

		defaults: {
			user: null,
		},

		url: './user',

		initialize: function() {
		},

		getCurrent: function() {
			user.fetch({
				method: 'GET',
				url: './user/getCurrent'
			});
		},

		login: function(id, pass) {
			user.save({}, {
				method: 'POST',
				url: './user/login',
				data: "id=" + id + '&password=' + pass/*{
					id: id,
					password: pass
				}*/
			});
		}
	});

	if (!user) {
		user = new UserModel();
	}

	console.log('in user.js user:', user);
	return user;

});