import React, { Component } from 'react'
import axios from 'axios'

import ReactPlayer from 'react-player'
import PlayerControls from '../PlayerControls/PlayerControls'
import './VimeoPlayer.css'

// TODO: Add image type functionality
// TODO: should div.masky be in PlayerControls?
// TODO: slideshow functionality
//  onEnd go to next video
// TODO: customize loading screen with onStart
//   Use [monster?] images for loading in between videos
// TODO: change dimensions of player on window resize

export default class VimeoPlayer extends Component {
  state = {
    video: {
      width: null,
      height: null,
      aspectRatio: null
    },
    // aspectRatio: window.innerWidth / window.innerHeight,
    volume: 0,
    playing: true
  }

  attachEventListeners = () => {
    // window.addEventListener('resize', this.onResize)
    window.addEventListener('keypress', this.handleKeyPress)
  }

  detachEventListeners = () => {
    window.removeEventListener('keypress', this.handleKeyPress)
  }

  // onResize = event => {
  //   console.log(window.innerHeight, window.innerWidth)
  // }

  handleKeyPress = event => {
    console.log(event.key)
    if (event.key.toLowerCase() === 'm') {
      this.toggleMute()
    } else if (event.key === ' ') {
      event.preventDefault()
      this.togglePlay()
    }
  }

  togglePlay = () => {
    this.setState(prevState => ({ playing: !prevState.playing }))
  }

  toggleMute = () => {
    this.setState(prevState => ({ volume: Number(!prevState.volume) }))
  }

  fetchVideoDimensions = () => {
    const VIMEO_ENDPOINT = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/'
    axios.get(`${VIMEO_ENDPOINT}${this.props.currentVideoSlug}`)
      .then(response => {
        this.setState(prevState => ({
          video: {
            ...prevState.video,
            aspectRatio: response.data.width / response.data.height,
            width: response.data.width,
            height: response.data.height
          }
        }))
      })
      .catch(anOopsy => console.error(anOopsy))
  }

  playerDimensions = () => {
    //  If playerAspectRatio > containerAspectRatio
    //    the player is relatively wider
    //    set playerHeight to containerHeight
    //    const playerWidth = playerHeight * playerAspectRatio
    // else
    //    the player is relatively narrower
    //    playerWidth = containerWidth
    //    playerHeight = playerWidth / playerAspectRatio

    const containerAspectRatio = window.innerWidth / window.innerHeight
    if (containerAspectRatio > this.state.video.aspectRatio) {
      return {
        width: this.state.video.height * this.state.video.aspectRatio,
        // wrong operator?
        // instead of this.state.video.height, need to adjust this proportionally, I think
        height: window.innerHeight
      }
    } else { // they could be equal
      return {
        width: window.innerWidth,
        height: this.state.video.width / this.state.video.aspectRatio
        // wrong operator?
        // instead of this.state.video.width, need to adjust this proportionally, I think
      }
    }
  }

  componentDidMount () {
    this.fetchVideoDimensions()
    this.attachEventListeners()
  }

  componentWillUnmount () {
    this.detachEventListeners()
  }

  render () {
    const { width, height } = this.playerDimensions()
    console.log(width, height, window.innerWidth, window.innerHeight)
    return (
      <div className={'showdown-react-player-container'}>
        {/* <div className='fake-iframe-container'>
          <div
            className='fake-iframe'
            style={{ width, height }}
          >
            texty123
          </div>
        </div> */}
        <div className={'masky'}>
          <PlayerControls
            isPlaying={this.state.playing}
            isMuted={!this.state.volume}
            togglePlay={this.togglePlay}
            toggleMute={this.toggleMute}
            previousVideo={this.props.previousVideo}
            nextVideo={this.props.nextVideo}
          />
        </div>
        <ReactPlayer
          className={'react-player'}
          url={`https://vimeo.com/${this.props.currentVideoSlug}`}
          width={width}
          height={height}
          // style={{ width, height }}
          volume={this.state.volume}
          playing={this.state.playing}
          loop
          onBuffer={_ => console.log('Desire is the root of all buffering', _)}
        />
      </div>
    )
  }
}
