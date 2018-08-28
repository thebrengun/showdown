import React, { Component } from 'react'

import fetchAssets from '../fetchAssets'

import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'
import CoverImage from '../CoverImage/CoverImage'

class PlayerContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { // state shape
      videos: [
        // {
        //   title: null,
        //   vimeoId: null,
        //   height: null,
        //   width: null,
        //   previewUrl: null
        // }
      ],
      images: [
        // {
        //   title: null,
        //   vimeoId: null,
        //   height: null,
        //   width: null,
        //   previewUrl: null
        // }
      ],
      currentVideo: null,
      hasPrevious: null,
      hasNext: null,
      imageIsShown: true
    }
    this.timeoutDuration = 2000
    this.timeoutId = null
  }

  loadVideo = () => {
    this.setState(prevState => ({ imageIsShown: false }))
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

  componentDidMount = () => {
    this.fetchAssets()
    this.setState(prevState => ({
      timeoutId: window.setInterval(this.loadVideo, this.timeoutDuration)
    }))
  }

  render () {
    const { currentVideo, videos } = this.state
    const component = currentVideo && !this.state.imageIsShown
      ? <VimeoPlayer
        currentVideo={currentVideo}
        videos={videos}
        selectVideo={this.selectVideo}
        previousVideo={this.previousVideo}
        nextVideo={this.nextVideo}
        hasPrevious={this.state.hasPrevious}
        hasNext={this.state.hasNext}
      />
      : <CoverImage />

    return component
  }
}

export default PlayerContainer
