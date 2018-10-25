import React from 'react'
import PlayToggleButton from '../PlayToggleButton/PlayToggleButton'
import { MuteToggleButton, PrevButton, NextButton } from 'react-player-controls'

import './PlayerControls.css'

export default ({
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
  previousVideo,
  nextVideo,
  hasPrevious,
  hasNext
}) => {
  return (
    <div className={'player-controls'}>
      <PrevButton
        isEnabled={hasPrevious}
        onClick={previousVideo}
      />
      <PlayToggleButton
        togglePlay={togglePlay}
        isPlaying={isPlaying}
      />
      <MuteToggleButton
        isEnabled
        isMuted={isMuted}
        onMuteChange={toggleMute}
      />
      <NextButton
        isEnabled={hasNext}
        onClick={nextVideo}
      />
    </div>
  )
}
