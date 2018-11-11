import React, { Component } from 'react'
import axios from 'axios'

import './VimeoPlayer.css'

import ReactPlayer from 'react-player'
import Menu from '../Menu/Menu'
import PlayerControls from '../PlayerControls/PlayerControls'

import makeCancelable from '../makeCancelable.js';

// TODO: Add image type functionality
// TODO: customize loading screen with onStart
//   Use [monster?] images for loading in between videos

export default class VimeoPlayer extends Component {
  state = {
    video: {
      width: null,
      height: null,
      aspectRatio: 1.78
    },
    volume: 0,
    playing: true,
    container: {
      width: null,
      height: null,
      margin: {top: null, left: null}
    },
    showControls: false
  }

  attachEventListeners = () => {
    this.cancelablePromises = [];
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keypress', this.handleKeyPress)
  }

  detachEventListeners = () => {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keypress', this.handleKeyPress)
    this.cancelablePromises.map(cancelablePromise => cancelablePromise.cancel());
  }

  onResize = event => {
    this.fetchVideoDimensions();
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
    const cancelablePromise = makeCancelable(axios.get(`${VIMEO_ENDPOINT}${this.props.currentVideo.vimeoId}`)
      .then(response => {
        this.setState(prevState => ({
          video: {
            ...prevState.video,
            aspectRatio: response.data.width / response.data.height,
            width: response.data.width,
            height: response.data.height
          }
        }));
        this.playerDimensions();
      })
      .catch(anOopsy => console.error(anOopsy)));
    this.cancelablePromises.push(cancelablePromise);
  }

  playerDimensions = () => {
      this.setState(prevState => {
        const { clientWidth:containerWidth, clientHeight:containerHeight } = this.showdownReactPlayerContainer;
        const aspectRatio = prevState.video.aspectRatio;

        const container = containerWidth / containerHeight < aspectRatio
          ? { // the player is relatively wider
            width: `${containerHeight * aspectRatio}px`,
            height: `${containerHeight}px`,
            margin: {top: '0px', left: ((containerHeight * aspectRatio) - containerWidth) / -4 + 'px'}
          }
          : { // the player is relatively narrower
            width: `${containerWidth}px`,
            height: `${containerWidth / aspectRatio}px`,
            margin: {top: ((containerWidth / aspectRatio) - containerHeight) / -4 + 'px', left: '0px'}
          };
        return {container};
      });
  }

  hideControls = () => {
    if(this.state.showControls) {
      this.setState({showControls: false});
    }
  }

  showControls = () => {
    if(!this.state.showControls) {
      this.setState({showControls: true});
    }
  }

  componentDidMount () {
    this.attachEventListeners();
    this.fetchVideoDimensions();
  }

  componentWillUnmount () {
    this.detachEventListeners()
  }

  render () {
    const {width, height, margin} = this.state.container;
    return (
      <div className="containiest">
        <div className="showdown-react-player-container" ref={(ref) => {this.showdownReactPlayerContainer = ref;}}>
          <div>
            <ReactPlayer
              className="react-player"
              url={`https://vimeo.com/${this.props.currentVideo.vimeoId}`}
              width={width}
              height={height}
              volume={this.state.volume}
              playing={this.state.playing}
              onEnded={this.props.nextVideo}
              onBuffer={_ => console.log('Desire is the root of all buffering', _)} 
              style={{position: 'absolute', width, height, top: margin.top, left: margin.left}}
            />
          </div>
        </div>
        <div className="menu-overlay">
          <Menu
            videos={this.props.videos}
            currentVideo={this.props.currentVideo}
            selectVideo={this.props.selectVideo}
          />
          <div className='placeholder' />
        </div>
        <div className="controls-overlay">
          {this.state.showControls &&
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
          }
        </div>
      </div>
    )
  }
}
