require.config({
	baseUrl: 'src',
	paths: {
		'text': '../lib/text',
		// 'jquery': '../lib/jquery-1.11.1.min',
		'jquery': '../lib/zepto.min',
		'backbone': '../lib/backbone-min',
		'underscore': '../lib/underscore-min',
		'config': '../config',
	},
	shim: {
		'underscore': {
			'exports': '_',
		},
	    'backbone': {
	        'deps': [ 'jquery', 'underscore' ],
	        'exports': 'Backbone'
	    },
	    'jquery': {
	    	'exports': 'Zepto'
	    },
	    // "jQT": {
	    // 	"exports": '$.jQT',
	    // 	"init": function() {
	    // 		return new $.jQT();
	    // 	}
	    // }
    }
});

require(['App'], function(App) {
	window.czyApp = new App(document.querySelector('.page-container'));
});


