import { PlayButton, PauseButton } from 'react-player-controls'

import React from 'react'

export default ({ isPlaying, togglePlay }) => {
  const button = isPlaying
    ? <PauseButton onClick={togglePlay} />
    : <PlayButton
      isEnabled
      onClick={togglePlay}
    />
  return button
}
