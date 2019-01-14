import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createPopupPost } from '../store.js';
import laurelBadge from './assets/laurel-badge.svg';
import laurelFrameL from './assets/laurel-frame-left.svg';

// To Do: move related css from web.css into Tile.css

class Tile extends PureComponent {
	handlePopupPost = (e) => {
		this.props.popupPost(this.props.postId, this.props.postType);
	};

	renderLinkText = () => {
		const { artist, song, director, linkText } = this.props;

		if(linkText) {
			return linkText;
		}

		return [
			artist && <span key="artist" className="artist-name">{artist}</span>,
			song && <span key="song" className="song-name">{song}</span>,
			director && <span key="director" className="director-name">{director}</span>
		].filter(s => s);
	};

	render() {
		const { handlePopupPost, renderLinkText } = this;
		const { awards, selectedFor, imageSrc } = this.props;
		return (
			<React.Fragment>
				<span className="music-video-link-thumbnail" onClick={handlePopupPost}>
					<img src={imageSrc} alt="Music Video" />
					{awards.length > 0 &&
						<span className="laurel-badge">
							<img src={laurelBadge} alt="Laurel Wreath" width="32" height="32" />
						</span>
					}
					{awards.length > 0 && 
						<span className="awards-overlay">
							<span className="awards-overlay-inner">
								<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" /></span>
								<span className="list">
									{selectedFor && <span>{selectedFor.join(' ')}</span>}
									{awards.map((award, i) => <span key={'award-' + i}>{award}</span>)}
								</span>
								<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" className="right" /></span>
							</span>
						</span>
					}
				</span>
				<span className="music-video-link-text" onClick={handlePopupPost}>
					{renderLinkText()}
				</span>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
	popupPost: (postId, postType) => dispatch(createPopupPost(postId, postType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);