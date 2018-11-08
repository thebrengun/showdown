import React, { Component } from 'react';
import './Slideshow.css';
import PlayerContainer from './PlayerContainer/PlayerContainer';
import largeLogo from './assets/showdown-logo-home.png';

class Slideshow extends Component {
	state = {offset: 0};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (e) => {
		this.setState({offset: window.scrollY * .5});
	};

	render () {
		return (
			<div 
				className="Slideshow" 
				style={{
					top: `-${this.state.offset}px`
				}}
			>
				<div className="home-header">
					<div className="home-header-logo-wrapper">
						<img src={largeLogo} alt="Showdown X" className="home-header-logo" />
					</div>
					<div className="home-header-event-info-wrapper">
						<div className="home-header-event-info">
							<span>January 16 2019</span>
							<span>Brooklyn Bowl</span>
						</div>
					</div>
				</div>
				<PlayerContainer />
			</div>
		)
	}
}

export default Slideshow
