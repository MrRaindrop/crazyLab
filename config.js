define(function() {
	return {
		'routes': [{
			'page': 'postlist',
			'keys': ['tag1', 'tag2']
		}],
		'home': {
			'page': 'postlist',
			'data': {
				'tag1': 'coder',
				'tag2': 'life'
			}
		},
		'localhost': '10.210.15.52:81',
	}
});