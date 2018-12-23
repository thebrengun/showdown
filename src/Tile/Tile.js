import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createPopupPost } from '../store.js';

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
			artist && <span className="artist-name">{artist}</span>,
			song && <span className="song-name">{song}</span>,
			director && <span className="director-name">{director}</span>
		].filter(s => s);
	};

	render() {
		const { handlePopupPost, renderLinkText } = this;
		return (
			<React.Fragment>
				<span className="music-video-link-thumbnail" onClick={handlePopupPost}>
					<img src={this.props.imageSrc} alt="Music Video" />
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