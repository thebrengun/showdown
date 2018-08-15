import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import './VimeoPlayer.css'

// TODO: Fullscreen player
// TODO: customize loading screen -- is there a ReactPlayer fn-prop for this?
//   Use monster art for loading screen?
// TODO: change dimensions of player on window resize

export default class VimeoPlayer extends Component {
  state = {
    aspectRatio: null,
    volume: 0,
    playing: true
  }

  attachEventListeners = () => {
    window.addEventListener('keypress', this.handleKeyPress)
  }

  detachEventListeners = () => {
    window.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = event => {
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
          aspectRatio: response.data.width / response.data.height
        }))
      })
      .catch(anOopsy => console.error(anOopsy))
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextProps.currentVideoSlug)
    return nextProps.currentVideoSlug
  }

  componentDidMount () {
    this.fetchAspectRatio()
    this.attachEventListeners()
  }

  componentWillUnmount () {
    this.detachEventListeners()
  }

  render () {
    const windowAspectRatio = window.innerWidth / window.innerHeight
    const difference = this.state.aspectRatio - windowAspectRatio

    console.log(this.state.aspectRatio, windowAspectRatio, difference)

    return (
      <div className={'showdown-react-player-wrapper'}>
        <ReactPlayer
          url={`https://vimeo.com/${this.props.currentVideoSlug}`}
          width={'100vw'}
          height={'100vh'}
          volume={this.state.volume}
          onBuffer={beep => console.log('bufferin', beep)}
          playing={this.state.playing}
          loop
        />
      </div>
    )
  }
}
