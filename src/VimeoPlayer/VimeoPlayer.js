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
    return window.innerWidth / window.innerHeight > this.state.video.aspectRatio
      ? { // the player is relatively wider
        width: window.innerHeight / this.state.video.aspectRatio,
        height: window.innerHeight
      }
      : { // // the player is relatively narrower
        width: window.innerWidth,
        height: window.innerWidth * this.state.video.aspectRatio
      }
  }

  onReady = () => {
    const iframe = document.querySelector('iframe')
    console.log(iframe.parentElement)
  }

  componentDidMount () {
    this.fetchVideoDimensions()
    this.attachEventListeners()
  }

  componentWillUnmount () {
    this.detachEventListeners()
  }

  render () {
    const { width: playerWidth, height: playerHeight } = this.playerDimensions()
    const [width, height] = [`${playerWidth}px`, `${playerHeight}px`]
    const containerAspectRatio = window.innerWidth / window.innerHeight
    console.log('\nwindow', containerAspectRatio, '\nvideo', this.state.video.aspectRatio)
    console.log('\nplayer', width, height, '\nWindow', window.innerWidth, window.innerHeight)
    return (
      <div
        className={'showdown-react-player-container'}
        style={{ width, height }}
      >
        <div
          className={'masky'}
          style={{ width, height }}
        >
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
          width={playerWidth}
          height={playerHeight}
          style={{ width, height }}
          volume={this.state.volume}
          playing={this.state.playing}
          loop
          onBuffer={_ => console.log('Desire is the root of all buffering', _)}
          onReady={this.onReady}
        />
      </div>
    )
  }
}
