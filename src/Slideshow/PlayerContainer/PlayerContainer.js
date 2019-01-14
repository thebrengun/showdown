import React, { Component } from 'react'

import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'
import CoverImage from '../CoverImage/CoverImage'

let fetchAssets;

if (process.env.NODE_ENV === 'production') {
  fetchAssets = require('../fetchAssets.js').default;
} else {
  fetchAssets = require('../fetchAssets.js').dummyFetchAssets;
}

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
    this.setState(prevState => {
      const currentVideoIndex = this.currentVideoIndex(prevState)
      return { currentVideo: prevState.videos[currentVideoIndex - 1] }
    }, this.handleVideoChange)
  }

  nextVideo = event => {
    this.setState(
      prevState => {
        const currentVideoIndex = this.currentVideoIndex(prevState);
        const inBounds = currentVideoIndex + 1 < prevState.videos.length;
        return { currentVideo: prevState.videos[inBounds ? currentVideoIndex + 1 : 0] }
      },
      this.handleVideoChange
    )
  }

  selectVideo = event => {
    event.preventDefault()
    event.persist()
    const byTitle = video => video.title === event.target.innerText
    this.setState(
      prevState => ({ currentVideo: prevState.videos.find(byTitle) }),
      this.handleVideoChange
    )
    event.stopPropagation();
  }

  fetchAssets = () => {
    fetchAssets().then(
      response => {
        const { videos, images } = response;
        this.setState(
          _ => ({
            videos,
            images,
            currentVideo: videos[0]
          }),
          this.checkNeighboringVideos
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  hideImage = () => {
    this.setState(prevState => ({ isImageShown: false }))
  }

  showImage = () => {
    window.clearInterval(this.timeoutId)
    this.setState({isImageShown: true})
    this.timeoutId = window.setTimeout(this.hideImage, this.timeoutDuration);
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
    return (
      [
        currentVideo ? 
          <VimeoPlayer
            currentVideo={currentVideo}
            videos={videos}
            selectVideo={this.selectVideo}
            previousVideo={this.previousVideo}
            nextVideo={this.nextVideo}
            hasPrevious={this.state.hasPrevious}
            hasNext={this.state.hasNext} 
            isImageShown={isImageShown} 
            key="video-player"
          /> : null, 
        isImageShown ? 
          <CoverImage key="cover-image" /> : null
      ]
    );
  }
}

export default PlayerContainer
