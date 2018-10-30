import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createPopupPost } from '../store.js';

// To Do: move related css from web.css into Tile.css

class Tile extends PureComponent {
	handlePopupPost = (e) => {
		this.props.popupPost(this.props.postId, this.props.postType);
	};

	render() {
		const { handlePopupPost } = this;
		return (
			<React.Fragment>
				<span className="music-video-link-thumbnail" onClick={handlePopupPost}>
					<img src="assets/mv-placeholder.jpg" alt="Music Video" />
				</span>
				<span className="music-video-link-text" onClick={handlePopupPost}>Music Video</span>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
	popupPost: (postId, postType) => dispatch(createPopupPost(postId, postType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);