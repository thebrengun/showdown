import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Slideshow from './Slideshow/Slideshow.js'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Slideshow />, document.getElementById('slideshow-root'))
registerServiceWorker()
