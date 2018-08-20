import { PlayButton, PauseButton } from 'react-player-controls'

import React from 'react'

export default ({ isPlaying, togglePlay }) => {
  const button = isPlaying
    ? <PlayButton
      isEnabled
      onClick={togglePlay}
    />
    : <PauseButton onClick={togglePlay} />
  return button
}
