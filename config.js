define(function() {
	return {
		'routes': [{
			'page': 'postlist',
			'keys': ['tag']
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
				'tag': 'life',
			}
		},
		'localhost': '10.210.15.52:81',
		'root': 'crazyLab/index.html#',
	}
});