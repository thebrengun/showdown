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
    showControls: 'play',
    container: {
      width: null,
      height: null,
      margin: {top: null, left: null}
    },
    currentControlToggle: 0
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
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  toggleMute = () => {
    this.setState(prevState => ({ volume: Number(!prevState.volume) }))
    this.showControls('sound');
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

  componentDidUpdate(prevProps) {
    if(prevProps.currentVideo && this.props.currentVideo && prevProps.currentVideo.vimeoId !== this.props.currentVideo.vimeoId) {
      this.fetchVideoDimensions();
      this.showControls('play');
    }
  }

  hideControls = () => {
    window.clearTimeout(this.showControlsTimer);
    this.setState({showControls: false});
  }

  showControls = (controlsName, withTimeout = true) => {
    window.clearTimeout(this.showControlsTimer);
    this.setState({showControls: controlsName});
    if(withTimeout) {
      this.showControlsTimer = window.setTimeout(this.hideControls, 3500);
    }
  };

  handlePlayChange = (e) => {
    this.showControls('play');
  };

  componentDidMount () {
    this.attachEventListeners();
    this.fetchVideoDimensions();
  }

  componentWillUnmount () {
    this.detachEventListeners();
    window.clearTimeout(this.showControlsTimer);
  }

  render () {
    const {width, height, margin} = this.state.container;
    return (
      <div className="containiest">
        <div className="showdown-react-player-container" ref={(ref) => {this.showdownReactPlayerContainer = ref;}}>
          <div>
            <ReactPlayer
              url={`https://vimeo.com/${this.props.currentVideo.vimeoId}`}
              width={width}
              height={height}
              volume={this.state.volume}
              playing={this.state.playing}
              onReady={this.props.handlePlayChange}
              onBuffer={this.props.handlePlayChange}
              onEnded={this.props.nextVideo}
              onPause={this.handlePlayChange}
              onPlay={this.handlePlayChange} 
              onStart={this.handlePlayChange}
              onBuffer={_ => console.log('Desire is the root of all buffering', _)} 
              className="react-player"
              style={{position: 'absolute', width, height, top: margin.top, left: margin.left}}
            />
          </div>
        </div>
        <div className="menu-overlay" onClick={(e) => {
          const { currentControlToggle } = this.state;
          const controlToggleList = [this.togglePlay, this.togglePlay, this.toggleMute];
          controlToggleList[currentControlToggle]();
          const nextControlToggle = currentControlToggle + 1;
          this.setState({currentControlToggle: nextControlToggle < controlToggleList.length ? nextControlToggle : 0});
        }}>
          <Menu
            videos={this.props.videos}
            currentVideo={this.props.currentVideo}
            selectVideo={this.props.selectVideo}
          />
        </div>
        <div className="controls-overlay">
          <PlayerControls
            isPlaying={this.state.playing}
            isMuted={!this.state.volume} 
            showControls={this.state.showControls}
          />
        </div>
      </div>
    )
  }
}
