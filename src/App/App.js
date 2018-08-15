import React, { Component } from 'react'
import _ld from 'lodash' // TODO: remove later

import Menu from '../Menu/Menu'
import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'

// TODO: replace URLS w/ videos from a Vimeo Album via API call
//   TODO: change embed setting to disbale controls via Vimeo Web UI or automate this process??!!

// † https://github.com/CookPete/react-player/issues/413
//   change permissions on vimeo, †causes ReactPlayer to not load next vid on state change

const URLS = [
  '201020459',
  // '271551085', // †
  '132463511',
  '196027549'
  // '95412461' // †
  // '87955153' // controls on embed not disabled
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videoSlugs: [],
      playingSlug: null
    }
  }

  fetchVideos = () => {
    this.setState(_ => ({
      videoSlugs: URLS,
      playingSlug: _ld.sample(URLS)
    }))
  }

  componentDidMount = () => {
    this.fetchVideos()
  }

  changeVideo = event => {
    event.preventDefault()
    event.persist()
    this.setState(prevState => ({
      playingSlug: event.target.innerText
    }))
  }

  render () {
    return (
      <div>
        {/* TODO: replace || workaround below */}
        <VimeoPlayer videoPlaying={this.state.playingSlug || '196027549'} />
        <Menu
          videos={this.state.videoSlugs}
          activeVideo={this.state.playingSlug}
          changeVideo={this.changeVideo}
        />
      </div>
    )
  }
}

export default App
