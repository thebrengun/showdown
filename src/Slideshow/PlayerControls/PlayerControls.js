import React from 'react';
import { PlayerIcon } from 'react-player-controls';

const iconProps = {width: 32, height: 32, fill: '#ff00ff'};
const PlayIcon = <PlayerIcon.Play {...iconProps} />;
const PauseIcon = <PlayerIcon.Pause {...iconProps} />;
const SoundOffIcon = <PlayerIcon.SoundOff {...iconProps} />;
const SoundOnIcon = <PlayerIcon.SoundOn {...iconProps} />;

class PlayerControls extends React.Component {
  state = {controls: 'play'};

  componentDidUpdate(prevProps) {
    const { showControls } = this.props;
    if(showControls !== false && prevProps.showControls !== showControls) {
      this.setState({controls: showControls});
    }
  }

  render() {
    const { isPlaying, isMuted, showControls } = this.props;
    const playStateIcon = isPlaying ? PauseIcon : PlayIcon;
    const soundStateIcon = isMuted ? SoundOffIcon : SoundOnIcon;
    return (
      <div className={`player-controls${!showControls ? ' hidden' : ''}`}>
        {this.state.controls === 'play' && playStateIcon}
        {this.state.controls === 'sound' && soundStateIcon}
      </div>
    );
  }
}

export default PlayerControls;