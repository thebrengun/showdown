import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Slideshow from './Slideshow/Slideshow.js'
import ColorScroll from './ColorScroll/ColorScroll.js'
import Nav from './Nav/Nav.js'
import registerServiceWorker from './registerServiceWorker'

/* 
	Since the Slideshow is done in React, I've decided to make all Javscript 
	in the Showdown site React. I want the advantage of the framework and 
	the workflow. However we'll use ReactDOM to render individual components 
	rather than making the entire page an App so that PHP can be used to render 
	static pages for users without Javascript and for search engines. Right now 
	shared state is finite so I will not use a global state manager but maybe 
	that can be implemented if necessary in the future.
 */

ReactDOM.render(<Slideshow />, document.getElementById('slideshow'));
ReactDOM.render(<ColorScroll />, document.getElementById('color-scroll'));
ReactDOM.render(<Nav />, document.getElementById('nav-wrapper'));
registerServiceWorker()
