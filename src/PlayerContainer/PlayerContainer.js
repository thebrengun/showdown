import React, { Component } from 'react'

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
      currentVideo: null,
      hasPrevious: null,
      hasNext: null
    }
  }

  currentVideoIndex = () => {
    return this.state.videos.findIndex(video => video.title === this.state.currentVideo.title)
  }

  checkNeighboringVideos = () => {
    const currentVideoIndex = this.currentVideoIndex()
    this.setState(prevState => ({
      hasPrevious: Boolean(this.state.videos[currentVideoIndex - 1]),
      hasNext: Boolean(this.state.videos[currentVideoIndex + 1])
    }))
  }

  previousVideo = () => {
    const currentVideoIndex = this.currentVideoIndex()
    this.setState(
      prevState => ({
        currentVideo: prevState.videos[currentVideoIndex - 1]
      }),
      this.checkNeighboringVideos
    )
  }

  nextVideo = () => {
    const currentVideoIndex = this.currentVideoIndex()
    this.setState(
      prevState => ({
        currentVideo: prevState.videos[currentVideoIndex + 1]
      }),
      this.checkNeighboringVideos
    )
  }

  selectVideo = event => {
    event.preventDefault()
    event.persist()
    this.setState(
      prevState => ({
        currentVideo: prevState.videos.find(video => video.title === event.target.innerText)
      }),
      this.checkNeighboringVideos
    )
  }

  componentDidMount = () => {
    this.fetchAssets()
  }

  fetchAssets = () => {
    const { videos, images } = fetchAssets()
    this.setState(
      _ => ({
        videos,
        images,
        currentVideo: videos[0]
      }),
      this.checkNeighboringVideos
    )
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
            hasPrevious={this.state.hasPrevious}
            hasNext={this.state.hasNext}
          />
        }
      </div>
    )
  }
}

export default PlayerContainer
