import { PlayButton, PauseButton } from 'react-player-controls'

import React from 'react'

export default ({ isPlaying, togglePlay }) => {
  console.log(isPlaying)
  const button = isPlaying
    ? <PlayButton
      isEnabled
      onClick={togglePlay}
    />
    : <PauseButton onClick={togglePlay} />
  return button
}
