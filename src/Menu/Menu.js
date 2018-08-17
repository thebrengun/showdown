import React, { Component } from 'react'
import './Menu.css'

// TODO: Add open/close display functionality

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      activeVideo: this.props.playingSlug
    }
  }

  sortVideos = () => {
    return [...new Set([this.props.activeVideo, ...this.props.videos])].reverse()
  }

  render () {
    const sortedVideos = this.sortVideos()
    const menuItems = sortedVideos.map((video, index) => {
      const itemStyle = {
        color: video === this.props.activeVideo ? 'rgb(252, 100, 217)' : 'white',
        letterSpacing: '.1em',
        display: 'block',
        padding: '.25em 0'
      }
      return (
        <a
          key={index}
          onClick={this.props.changeVideo}
          className={'menu-item'}
          style={itemStyle}
        >
          {video}
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
