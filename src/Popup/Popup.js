import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Popup.css';
import { createPopupHide } from '../store.js';
import loadImg from './assets/loader-animated.gif';
import laurelFrameL from '../Tile/assets/laurel-frame-left.svg';

class Popup extends Component {
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

class InfoPopup extends Component {
	render() {
		return (
			<div className="popup-inner">
				<div className="popup-loading-image">
					<img src={loadImg} alt="Monster With A Guitar Rolls His Eyes" />
				</div>
			</div>
		);
	}
}

class ArtistPopup extends Component {
	render() {
		const { title, website, image, description, awards, selected_for } = this.props.data;

		if(awards && awards.length === 0) {
			awards.push('Finalist');
		}

		return (
			<div className="popup-inner">
				<div className="popup-image-wrapper">
					<div className="popup-image">
						<img src={image} alt={`${title}`} />
					</div>
					{awards.length > 0 && 
					<span className="awards-overlay-inner awards-popup">
						<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" /></span>
						<span className="list">
							{selected_for && <span>{selected_for.join(' ')}</span>}
							{awards.map((award, i) => <span key={'award-' + i}>{award}</span>)}
						</span>
						<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" className="right" /></span>
					</span>
					}
				</div>
				<div className="popup-padding">
					<h2 dangerouslySetInnerHTML={{__html: title}}></h2>
					<div className="popup-description" dangerouslySetInnerHTML={description}></div>
					{website && <ExternalLink url={website}>{`Visit ${title}`}</ExternalLink>}
				</div>
			</div>
		);
	}
}

class VideoPopup extends Component {
	render() {
		const { 
			title, image, director_name, director_bio, director_website, vimeo_url, video_description, 
			artist_name, artist_website, video_image, meta_image, awards, selected_for
		} = this.props.data;

		if(awards && awards.length === 0) {
			awards.push('Finalist');
		}

		const vimeo_path = vimeo_url ? vimeo_url.split('/') : '';
		const vimeo_id = vimeo_path ? vimeo_path[vimeo_path.length - 1] : '';
		const selected_video_image = video_image && video_image['sizes'] ? video_image['sizes']['showdown-x-thumb'] : meta_image;
		return (
			<div className="popup-inner popup-video-inner">
				<div className="popup-video-wrapper">
					<div className="popup-padding">
						<h2 dangerouslySetInnerHTML={{__html: title}}></h2>
						<h3 dangerouslySetInnerHTML={{__html: artist_name}}></h3>
						{vimeo_id ? <div className="react-player-wrapper">
							<iframe 
								id="vpup" 
								title={title}
								className="react-player"
								wmode="opaque" 
								seamless="seamless" 
								allowfullscreen="" 
								webkitallowfullscreen="" 
								mozallowfullscreen="" 
								src={`https://player.vimeo.com/video/${vimeo_id}?title=0&byline=0&portrait=0&color=ffffff&autoplay=1&api=1&loop=0&player_id=vpup`}>
							</iframe>
						</div> : 
						<div className="popup-image">
							<img src={selected_video_image} alt={`${title}`} />
						</div>
						}
						<div className="popup-description" dangerouslySetInnerHTML={video_description}></div>
						{artist_website && <ExternalLink url={artist_website}>Visit {artist_name}</ExternalLink>}
					</div>
				</div>
				<div className="popup-director popup-padding">
					<h2 dangerouslySetInnerHTML={{__html: director_name}}></h2>
					<h3>Director</h3>
					{image && <div className="popup-image">
						<img src={image} alt={director_name} />
					</div>}
					{awards.length > 0 && 
					<span className="awards-overlay-inner awards-popup video">
						<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" /></span>
						<span className="list">
							{selected_for && <span>{selected_for.join(' ')}</span>}
							{awards.map((award, i) => <span key={'award-' + i}>{award}</span>)}
						</span>
						<span className="laurel"><img src={laurelFrameL} alt="Laurel Branch" className="right" /></span>
					</span>
					}
					<div className="popup-description" dangerouslySetInnerHTML={director_bio}></div>
					{director_website && <ExternalLink url={director_website}>{`Visit ${director_name}`}</ExternalLink>}
				</div>
			</div>
		);
	}
}

class SponsorJudgePopup extends Component {
	render() {
		const { title, website, image, logo, description } = this.props.data;
		const logoUrl = logo && logo.sizes && logo.sizes['showdown-x-thumb'] ? logo.sizes['showdown-x-thumb'] : '';
		return (
			<div className="popup-inner">
				<div className="popup-image-wrapper">
					<div className="popup-image">
						<img src={image || logoUrl} alt={`${title}`} />
					</div>
				</div>
				<div className="popup-padding">
					<h2 dangerouslySetInnerHTML={{__html: title}}></h2>
					<div className="popup-description" dangerouslySetInnerHTML={description}></div>
					{website && <ExternalLink url={website}>{`Visit ${title}`}</ExternalLink>}
				</div>
			</div>
		);
	}
}

function ExternalLink({url, children}) {
	return <a href={formatLink(url)} target="_blank" rel="noopener">{children}</a>;
}

function formatLink(url) {
	if(url.indexOf('//') > -1) {
		return url;
	}
	return '//' + url;
}

const mapStateToProps = ({popupHidden: hidden, popupRequest: request, popupData: data}) => ({hidden, request, data});
const mapDispatchToProps = (dispatch) => ({
	hide: (e) => dispatch(createPopupHide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);