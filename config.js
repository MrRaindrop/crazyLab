define(function() {
	return {
		'routes': [{
			'page': 'postlist',
			'keys': ['tag1', 'tag2']
		}, {
			'page': 'post',
			'keys': ['id']
		}, {
			'page': 'user',
			'keys': ['id']
		}],
		'home': {
			'page': 'postlist',
			'data': {
				'tag1': 'coder',
				'tag2': 'life'
			}
		},
		'localhost': '10.210.15.52:81',
		'root': 'crazyLab/index.html#',
	}
});