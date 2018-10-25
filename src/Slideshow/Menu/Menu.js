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

  render () {
    if (!this.props.currentVideo) return <div style={{ color: 'white' }}>Loading...</div>
    const titles = this.props.videos.map(video => video.title)
    const menuItems = titles.map((title, index) => {
      const itemStyle = {
        color: title === this.props.currentVideo.title ? 'rgb(252, 100, 217)' : 'white'
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
