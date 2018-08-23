import React, { Component } from 'react'
import axios from 'axios'

import './VimeoPlayer.css'

import ReactPlayer from 'react-player'
import Menu from '../Menu/Menu'
import PlayerControls from '../PlayerControls/PlayerControls'

// TODO: unmute on initial play
// TODO: Add image type functionality
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
    volume: 0,
    playing: true
  }

  attachEventListeners = () => {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keypress', this.handleKeyPress)
  }

  detachEventListeners = () => {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keypress', this.handleKeyPress)
  }

  onResize = event => {
    this.fetchVideoDimensions()
  }

  handleKeyPress = event => {
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
    axios.get(`${VIMEO_ENDPOINT}${this.props.currentVideo.vimeoId}`)
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
    return window.innerWidth / window.innerHeight < this.state.video.aspectRatio
      ? { // the player is relatively wider
        width: `${window.innerHeight * this.state.video.aspectRatio}px`,
        height: `${window.innerHeight}px`,
        margin: `0px ${((window.innerHeight * this.state.video.aspectRatio) - window.innerWidth) / -2}px`
      }
      : { // the player is relatively narrower
        width: `${window.innerWidth}px`,
        height: `${window.innerWidth / this.state.video.aspectRatio}px`,
        margin: `${((window.innerWidth / this.state.video.aspectRatio) - window.innerHeight) / -2}px 0px`
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
    const {width, height, margin} = this.playerDimensions()
    return (
      <div className={'containiest'}>
        <div className={'showdown-react-player-container'}>
          <div style={{margin}}>
            <ReactPlayer
              className={'react-player'}
              url={`https://vimeo.com/${this.props.currentVideo.vimeoId}`}
              width={width}
              height={height}
              style={{ width, height }}
              volume={this.state.volume}
              playing={this.state.playing}
              onEnded={this.props.nextVideo}
              onBuffer={_ => console.log('Desire is the root of all buffering', _)}
              // onEnd
            />
          </div>
        </div>
        <div className={'controls-overlay'}>
          <Menu
            videos={this.props.videos}
            currentVideo={this.props.currentVideo}
            selectVideo={this.props.selectVideo}
          />
          <PlayerControls
            isPlaying={this.state.playing}
            isMuted={!this.state.volume}
            togglePlay={this.togglePlay}
            toggleMute={this.toggleMute}
            previousVideo={this.props.previousVideo}
            nextVideo={this.props.nextVideo}
            hasPrevious={this.props.hasPrevious}
            hasNext={this.props.hasNext}
          />
          <div className='placeholder' />
        </div>
      </div>
    )
  }
}
