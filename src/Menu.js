import React, { Component } from 'react'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeVideo: this.props.playingSlug
    }
  }

  render () {
    const menuItems = this.props.videos.map((video, index) => {
      const itemStyle = {
        color: video === this.props.activeVideo ? 'yellow' : 'green',
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

    const style = {
      position: 'absolute',
      top: window.innerHeight * 0.5,
      left: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      padding: '1em'
    }
    return (
      <div style={style}>
        {menuItems}
      </div>
    )
  }
}
