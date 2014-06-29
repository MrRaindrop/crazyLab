define(function(require) {

	var html = require('text!./template.html'),
		css = require('text!./style.css'),
		_ = require('underscore'),
		router = require('module/router'),
		user = require('module/user');
		addStyle = require('util/addStyle'),

	addStyle(css);

	var Header = function(el, opt) {
		if (el) {
			this.$el = $(el);
			el.innerHTML = html;
			this.bindEvents();
		}
	};

	Header.prototype.bindEvents = function() {
		this.$el.find('.register').tap(_.bind(this.onRegister, this));
		this.$el.find('.home').tap(_.bind(this.onHome, this));
		this.$el.find('.login').tap(_.bind(this.onLogin, this));
	};

	Header.prototype.onRegister = function(e) {
		e.preventDefault();
		router.setRoute('register');
	};

	Header.prototype.onHome = function(e) {
		e.preventDefault();
		router.setHome();
	};

	Header.prototype.onLogin = function(e) {
		e.preventDefault();
		console.log('login');

		// router.setRoute();

		// test
		user.login('0001', 'abc');
	};

	return Header;

});