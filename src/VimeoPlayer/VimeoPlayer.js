import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'

// TODO: Fullscreen player
// TODO: customize loading screen -- is there a ReactPlayer fn-prop for this?
//   Use monster art for loading screen?
// TODO: change dimensions of player on window resize
// TODO: add event listeners for playing/pausing, or focus player element somehow

export default class VimeoPlayer extends Component {
  state = {
    aspectRatio: null
    // videoHeight: null,
    // videoWidth: null
  }

  componentDidMount () {
    const VIMEO_ENDPOINT = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/'
    axios.get(`${VIMEO_ENDPOINT}${this.props.videoPlaying}`)
      .then(response => {
        this.setState(prevState => ({
          aspectRatio: response.data.width / response.data.height
        }))
      })
      .catch(anOopsy => console.error(anOopsy))
  }

  render () {
    const windowAspectRatio = window.innerWidth / window.innerHeight
    const difference = this.state.aspectRatio - windowAspectRatio

    console.log(this.state.aspectRatio, windowAspectRatio, difference)

    return (
      <div className={'showdown-react-player-wrapper'}>
        <ReactPlayer
          url={`https://vimeo.com/${this.props.videoPlaying}`}
          width={window.innerWidth}
          height={window.innerHeight}
          // width={'100%'}
          // height={'100%'}
          playing
          muted
          loop
          onBuffer={beep => console.log('bufferin', beep)}
          onProgress={beep => console.log('progressin', beep)}
        />
      </div>
    )
  }
}
