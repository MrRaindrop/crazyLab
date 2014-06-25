define(function(require) {

	var html = require('text!./template.html'),
		css = require('text!./style.css'),
		// _ = require('underscore'),
		addStyle = require('util/addStyle');

	addStyle(css);

	var Footer = function(el, opt) {
		var tp, df;
		if (el) {
			el.innerHTML = html;
		}
	};

	return Footer;

});