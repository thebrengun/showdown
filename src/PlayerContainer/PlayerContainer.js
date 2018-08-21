import React, { Component } from 'react'
import _ld from 'lodash' // TODO: remove later

import { mod } from '../utils'
import fetchAssets from '../fetchAssets'

// import Menu from '../Menu/Menu'
import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'

class PlayerContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: [
        {
          title: null,
          vimeoId: null,
          height: null,
          width: null,
          previewUrl: null
        }
      ],
      images: [
        {
          title: null,
          vimeoId: null,
          height: null,
          width: null,
          previewUrl: null
        }
      ],
      currentVideo: null
    }
  }

  fetchAssets = () => {
    const { videos, images } = fetchAssets()
    console.log(videos, images)
    this.setState(_ => ({
      videos,
      images,
      currentVideo: _ld.sample(videos)
    }))
  }

  previousVideo = () => {
  }

  nextVideo = () => {
  }

  componentDidMount = () => {
    this.fetchAssets()
  }

  selectVideo = event => {
    event.preventDefault()
    event.persist()
    this.setState(prevState => ({
      currentVideo: prevState.videos.find(video => video.title === event.target.innerText)
    }))
  }

  render () {
    const { currentVideo, videos } = this.state
    return (
      <div>
        {
          currentVideo &&
          <VimeoPlayer
            currentVideo={currentVideo}
            videos={videos}
            selectVideo={this.selectVideo}
            previousVideo={this.previousVideo}
            nextVideo={this.nextVideo}
          />
        }
      </div>
    )
  }
}

export default PlayerContainer
