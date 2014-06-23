define(function(css) {
	return function addStyle(css) {
		var style = document.createElement('style');
		style.innerHTML = css;
		document.head.appendChild(style);
	};
});