function getPost({postId, postType = 'artist',forceLive = false}) {
	if (process.env.NODE_ENV !== 'production' && !forceLive) {
		return mockGetPost(postId);
	}

	return new Promise(function(resolve, reject) {
		const url = `https://showdown.silversound.us/wp-json/wp/v2/${postType}/${postId}`;
		const request = new XMLHttpRequest();
		request.withCredentials = true;
		request.open('GET', url);
		request.responseType = 'text';
		request.onreadystatechange = () => {
			if(request.readyState === 4 && request.status === 200) {
				const response = JSON.parse(request.response);
				if(response.acf) {
					response.acf = JSON.parse(response.acf);
				}
				resolve(response);
			}
		};
		request.send();
	});
}

function mockGetPost(postId) {
	if(postId) {
		console.log(`Found 'postId': ${postId} but using mock request.`);
	}
	const data = require('./mockData.json');
	// Using mock request to limit hitting the API.
	return Promise.resolve(data);
}

export default getPost;