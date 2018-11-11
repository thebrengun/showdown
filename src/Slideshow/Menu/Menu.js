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
      const itemStyle = {
        color: title === this.props.currentVideo.title ? '#ff00ff' : 'white'
      }
      return (
        <a
          key={index}
          onClick={this.props.selectVideo}
          className={'menu-item'}
          style={itemStyle}
        >
          {title}
        </a>
      )
    })

    return (
      <div className={'menu-container'} >
        {menuItems}
      </div>
    )
  }
}


Menu.defaultProps = {
  show: 3
};