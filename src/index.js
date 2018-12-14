import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store.js';
import { Provider } from 'react-redux';
import Slideshow from './Slideshow/Slideshow.js';
import ColorScroll from './ColorScroll/ColorScroll.js';
import Popup from './Popup/Popup.js';
import Tile from './Tile/Tile.js';
import enhanceEntryForms from './enhanceEntryForms.js';
import enhanceNav from './enhanceNav.js';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', function(event) {
	enhanceNav('nav-container');
	enhanceEntryForms();
});

/* 
	Since the Slideshow is done in React, I've decided to make all Javscript 
	in the Showdown site React. I want the advantage of the framework and 
	the workflow. However we'll use ReactDOM to render individual components 
	rather than making the entire page an App so that PHP can be used to render 
	static pages for users without Javascript and for search engines. Right now 
	shared state is finite so I will not use a global state manager but maybe 
	that can be implemented if necessary in the future.
 */

const slideshowRoot = document.getElementById('slideshow');

if(slideshowRoot) {
	ReactDOM.render(
		<Slideshow 
			image={slideshowRoot.dataset.image} 
			date={slideshowRoot.dataset.date} 
			location={slideshowRoot.dataset.location} 
		/>, 
		slideshowRoot
	);
}
ReactDOM.render(<ColorScroll />, document.getElementById('color-scroll'));

document.querySelectorAll('.music-video-link').forEach(
	container => 
		ReactDOM.render(
			createElement(
				Provider, {store}, 
				createElement(Tile, {
					postId: container.dataset.postid, 
					postType: container.dataset.posttype,
					linkText: container.dataset.linktext,
					imageSrc: container.dataset.imagesrc
				})
			), 
			container
		)
);

ReactDOM.render(
	<Provider store={store}>
		<Popup />
	</Provider>, 
	document.getElementById('showdown-popup')
);

registerServiceWorker();
