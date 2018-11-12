import React, { Component } from 'react'
import './Menu.css'

// TODO: Add open/close display functionality

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  wrapMenu = () => {
    const { videos, currentVideo, show } = this.props;
    const currentVideoIndex = videos.reduce((acc, {title}, i) => title === currentVideo.title ? i : acc, -1);
    const startFromCurrentVideo = videos.slice(currentVideoIndex, currentVideoIndex + show);
    const len = startFromCurrentVideo.length;
    return len === show ? startFromCurrentVideo : [...startFromCurrentVideo, ...videos.slice(0, Math.min(currentVideoIndex, show - len))];
  };

  render () {
    if (!this.props.currentVideo) return <div style={{ color: 'white' }}>Loading...</div>
    const titles = this.wrapMenu().map(({title}) => title);
    const menuItems = titles.map((title, index) => {
      return (
        <a
          key={index}
          onClick={this.props.selectVideo}
          className={['menu-item', title === this.props.currentVideo.title ? 'selected' : ''].join(' ')}
        >
          {title}
        </a>
      )
    })

    return (
      <div className="menu-container">
        <div className="menu-container-row">
          <span className="menu-container-now-next now">Now:</span>
          <span>{menuItems[0]}</span>
        </div>
        <div className="menu-container-row">
          <span className="menu-container-now-next">Next:</span>
          <span>{menuItems.slice(1)}</span>
        </div>
      </div>
    )
  }
}


Menu.defaultProps = {
  show: 3
};