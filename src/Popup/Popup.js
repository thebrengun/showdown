import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Popup.css';
import { createPopupHide } from '../store.js';
import ReactPlayer from 'react-player';
import loadImg from './assets/loader-animated.gif';

class Popup extends PureComponent {
	renderRequesting = () => {
		return (
			<InfoPopup>
				<h2>>Requesting Post Data...</h2>
				<p></p>
			</InfoPopup>
		);
	};

	renderRequestError = () => {
		return (
			<InfoPopup>
				<div>No Post Data</div>
			</InfoPopup>
		);
	};

	renderRequestSuccess = (data) => {
		switch(this.props.data.postType) {
			case "sponsor":
			case "judge":
				return <SponsorJudgePopup data={data} />;
			case "artist":
				return <ArtistPopup data={data} />;
			case "video":
				return <VideoPopup data={data} />;
			default:
				return '';
		}
	};

	render() {
		const { renderRequesting, renderRequestSuccess, renderRequestError } = this;
		const { hidden, hide, request, data } = this.props;

		if(hidden) {
			return '';
		}

		return (
			<div className="Popup">
				<div className="popup-close-btn-wrapper">
					<button className="popup-close-btn" onClick={hide}>
						<span className="u-hidden">Close Popup</span>
					</button>
				</div>
				<div className="popup-window">
					{request && renderRequesting()}
					{!request && !data && renderRequestError()}
					{!request && data && renderRequestSuccess(data)}
				</div>
			</div>
		);
	}
}

class InfoPopup extends PureComponent {
	render() {
		return (
			<div className="popup-inner">
				<div className="popup-loading-image">
					<img src={loadImg} />
				</div>
			</div>
		);
	}
}

class ArtistPopup extends PureComponent {
	render() {
		const { title, website, image, description, relationship } = this.props.data;
		return (
			<div className="popup-inner">
				<div className="popup-image-wrapper">
					<div className="popup-image">
						<img src={image} alt={`${title}`} />
					</div>
				</div>
				<div className="popup-padding">
					<h2>{title}</h2>
					<div className="popup-description" dangerouslySetInnerHTML={description}></div>
					{website && <a href={website}>{`Visit ${title}`}</a>}
				</div>
				{relationship.map(
					({post_title}, i) => 
						<div className="popup-padding popup-festival" key={'festival-artist-relationship-' + i}>
							<h2>{post_title}</h2>
							<span>Grand Prize Winner</span>
						</div>
				)}
			</div>
		);
	}
}

class VideoPopup extends PureComponent {
	render() {
		const { 
			title, website, image, description, relationship, director_name, director_bio, 
			director_image, director_website, vimeo_url, video_description, artist_name, 
			artist_website 
		} = this.props.data;
		return (
			<div className="popup-inner popup-video-inner">
				<div className="popup-video-wrapper">
					<ReactPlayer url={vimeo_url} width="100%" />
					<div className="popup-padding">
						<h2>{title}</h2>
						<h3>{artist_name}</h3>
						<div className="popup-description" dangerouslySetInnerHTML={video_description}></div>
						{artist_website && <a href={artist_website}>Visit {artist_name}</a>}
					</div>
				</div>
				<div className="popup-director popup-padding">
					<h2>{director_name}</h2>
					<h3>Director</h3>
					<div className="popup-image">
						<img src={image} />
					</div>
					<div className="popup-description" dangerouslySetInnerHTML={director_bio}></div>
					{director_website && <a href={director_website}>{`Visit ${director_name}`}</a>}
				</div>
			</div>
		);
	}
}

class SponsorJudgePopup extends PureComponent {
	render() {
		const { title, website, image, description, relationship } = this.props.data;
		return (
			<div className="popup-inner">
				<div className="popup-image-wrapper">
					<div className="popup-image">
						<img src={image} alt={`${title}`} />
					</div>
				</div>
				<div className="popup-padding">
					<h2>{title}</h2>
					<div className="popup-description" dangerouslySetInnerHTML={description}></div>
					{website && <a href={website}>{`Visit ${title}`}</a>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({popupHidden: hidden, popupRequest: request, popupData: data}) => ({hidden, request, data});
const mapDispatchToProps = (dispatch) => ({
	hide: (e) => dispatch(createPopupHide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);