import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import './VimeoPlayer.css'

// TODO: Add image type functionality
// TODO: div.masky should be a Controls component
// TODO: slideshow functionality
// TODO: customize loading screen with onStart
//   Use [monster?] images for loading in between videos
// TODO: change dimensions of player on window resize

export default class VimeoPlayer extends Component {
  state = {
    video: {
      height: null,
      width: null,
      aspectRatio: null
    },
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

  onResize = event => {
    console.log(window.innerHeight, window.innerWidth)
  }

  handleKeyPress = event => {
    console.log(event.key)
    if (event.key.toLowerCase() === 'm') {
      this.setState(prevState => ({ volume: Number(!prevState.volume) }))
    } else if (event.key.toLowerCase() === ' ') {
      this.setState(prevState => ({ playing: !prevState.playing }))
    }
  }

  fetchAspectRatio = () => {
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

  componentDidMount () {
    this.fetchAspectRatio()
    this.attachEventListeners()
  }

  componentWillUnmount () {
    this.detachEventListeners()
  }

  render () {
    return (
      <div className={'showdown-react-player-wrapper'}>
        <div className={'masky'} />
        <div className='player-container'>
          <ReactPlayer
            url={`https://vimeo.com/${this.props.currentVideoSlug}`}
            // width={'100%'}
            // height={'100%'}
            volume={this.state.volume}
            playing={this.state.playing}
            loop
            onBuffer={_ => console.log('life is buffering')}
          />
        </div>
      </div>
    )
  }
}
