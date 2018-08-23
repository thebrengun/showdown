import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('slideshow-root'))
registerServiceWorker()
