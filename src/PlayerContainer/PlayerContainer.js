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
      isImageShown: true
    }
    this.timeoutDuration = 2000
    this.timeoutId = null
  }

  currentVideoIndex = state => {
    const byCurrentTitle = video => video.title === state.currentVideo.title
    return state.videos.findIndex(byCurrentTitle)
  }

  checkNeighboringVideos = () => {
    this.setState(prevState => {
      const currentVideoIndex = this.currentVideoIndex(prevState)
      return {
        hasPrevious: Boolean(prevState.videos[currentVideoIndex - 1]),
        hasNext: Boolean(prevState.videos[currentVideoIndex + 1])
      }
    })
  }

  handleVideoChange = () => {
    this.showImage()
    this.checkNeighboringVideos()
  }

  previousVideo = event => {
    // event.persist()
    this.setState(prevState => {
      const currentVideoIndex = this.currentVideoIndex(prevState)
      return { currentVideo: prevState.videos[currentVideoIndex - 1] }
    }, this.handleVideoChange)
  }

  nextVideo = event => {
    // event.persist()
    this.setState(prevState => {
      const currentVideoIndex = this.currentVideoIndex(prevState)
      return { currentVideo: prevState.videos[currentVideoIndex + 1] }
    }, this.handleVideoChange)
  }

  selectVideo = event => {
    event.preventDefault()
    event.persist()
    const byTitle = video => video.title === event.target.innerText
    this.setState(
      prevState => ({ currentVideo: prevState.videos.find(byTitle) })
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

  hideImage = () => {
    this.setState(prevState => ({ isImageShown: false }))
  }

  showImage = () => {
    window.clearInterval(this.timeoutId)
    this.setState(prevState => ({
      isImageShown: true,
      timeoutId: window.setTimeout(this.hideImage, this.timeoutDuration)
    }))
  }

  componentWillUnmount = () => {
    window.clearInterval(this.timeoutId)
  }

  componentDidMount = () => {
    this.fetchAssets()
    this.showImage()
  }

  render () {
    const { currentVideo, videos, isImageShown } = this.state
    return currentVideo && !isImageShown
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
  }
}

export default PlayerContainer
