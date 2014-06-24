define(function() {
	var Page = function() {
		this.dom = document.createElement('div');
		this.uri = null;
		this.html = '';
	};

	Page.prototype.onCreate = function() {
		console.log('Page.onCreate.');
		this.dom.innerHTML = this.html;
	};

	Page.prototype.onShow = function() {
		console.log('Page.onShow.');
	};

	Page.prototype.onHide = function() {
		console.log('Page.onHide.');
	};

	Page.prototype.onDestroy = function() {
		console.log('Page.onDestroy.');
	};

	return Page;
});