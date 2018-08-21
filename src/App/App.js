import React, { Component } from 'react'
import _ld from 'lodash' // TODO: remove later

import { mod } from '../utils'
import Menu from '../Menu/Menu'
import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'
import dummyData from '../dummyData'

// TODO: replace URLS w/ videos from a Vimeo Album via API call
//   TODO: change embed setting to disable controls via Vimeo Web UI or automate this process??!!

// prod ENDPOINT: https://showdown.silversound.us/wp-admin/admin-ajax.php?action=get_slideshow_data

// const URLS = [
//   '201020459',
//   '132463511',
//   '196027549'
// ]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videoSlugs: [], // change shape to match API's
      currentVideoSlug: null
    }
  }

  fetchVideos = () => {
    const slugs = dummyData.data
      .filter(item => item.type === 'vimeo_video')
      .map(video => video.vimeo_id)
    this.setState(_ => ({
      videoSlugs: slugs,
      currentVideoSlug: _ld.sample(slugs)
    }))
  }

  previousVideo = () => {
    const currentVideoIndex = this.state.videoSlugs.indexOf(this.state.currentVideoSlug)
    const previousVideoIndex = mod(currentVideoIndex - 1, this.state.videoSlugs.length)
    this.setState(prevState => ({ currentVideoSlug: prevState.videoSlugs[previousVideoIndex] }))
  }

  nextVideo = () => {
    const currentVideoIndex = this.state.videoSlugs.indexOf(this.state.currentVideoSlug)
    const nextVideoIndex = mod(currentVideoIndex + 1, this.state.videoSlugs.length)
    this.setState(prevState => ({ currentVideoSlug: prevState.videoSlugs[nextVideoIndex] }))
  }

  componentDidMount = () => {
    this.fetchVideos()
  }

  changeVideo = event => {
    event.preventDefault()
    event.persist()
    this.setState(prevState => ({ currentVideoSlug: event.target.innerText }))
  }

  render () {
    const { currentVideoSlug, videoSlugs } = this.state
    return (
      <div>
        {
          currentVideoSlug &&
          <VimeoPlayer
            currentVideoSlug={currentVideoSlug}
            videos={videoSlugs}
            changeVideo={this.changeVideo}
            previousVideo={this.previousVideo}
            nextVideo={this.nextVideo}
            onL
          />
        }
        <Menu
          videos={videoSlugs}
          activeVideo={currentVideoSlug}
          changeVideo={this.changeVideo}
        />
      </div>
    )
  }
}

export default App
