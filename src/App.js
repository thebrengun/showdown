import React, { Component } from 'react'
import Menu from './Menu'
import ReactPlayer from 'react-player'
import _ from 'lodash'

const URLS = [
  '87955153',
  '37328349',
  '82886585',
  '231657985',
  '205318460'
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videoSlugs: [],
      playingSlug: _.sample(URLS)
    }
  }

  changeVideo = (event) => {
    event.preventDefault()
    event.persist()
    console.log(event.target.innerText)
    this.setState(prevState => ({
      playingSlug: event.target.innerText
    }))
  }

  render () {
    // const vimeoConfig = {
    //   vimeo: {
    //     playerOptions: {
    //       background: true
    //     }
    //   }
    // }

    return (
      <div>
        <ReactPlayer
          url={`https://vimeo.com/${this.state.playingSlug}`}
          height={window.innerHeight}
          width={window.innerWidth}
          playing
          muted
          // config={vimeoConfig}
        />
        <Menu
          videos={URLS}
          activeVideo={this.state.playingSlug}
          changeVideo={this.changeVideo}
        />
      </div>
    )
  }
}

export default App
