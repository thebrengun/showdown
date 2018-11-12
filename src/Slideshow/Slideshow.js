import React, { Component } from 'react';
import 'classlist-polyfill';
import './Slideshow.css';
import PlayerContainer from './PlayerContainer/PlayerContainer';
import largeLogo from './assets/showdown-logo-home.png';

class Slideshow extends Component {
	state = {offset: 0, modifyHeader: true};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		this.header = document.getElementById('header');
		this.addClassToHeader();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		this.removeClassFromHeader();
	}

	addClassToHeader = () => {
		if(this.header) {
			this.header.classList.add('with-slideshow');
		}
	};

	removeClassFromHeader = () => {
		if(this.header) {
			this.header.classList.remove('with-slideshow');
		}
	};

	handleScroll = (e) => {
		const { modifyHeader } = this.state;
		const { scrollY } = window;
		const offset = scrollY * .5;
		const logoThreshhold = 300;
		const nextState = {offset};

		if(scrollY > logoThreshhold && modifyHeader) {
			this.removeClassFromHeader();
			nextState.modifyHeader = false;
		} else if(scrollY < logoThreshhold && !modifyHeader) {
			this.addClassToHeader();
			nextState.modifyHeader = true;
		}

		this.setState(nextState);
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
					<div className="home-header-column">
						<div className="home-header-logo-wrapper">
							<img 
								src={largeLogo} 
								alt="Silver Sound Showdown X Music and Video Festival" 
								className="home-header-logo" 
							/>
						</div>
						<div className="home-header-event-info-wrapper">
							<div className="home-header-event-info">
								<span>January 16 2019</span>
								<span>Brooklyn Bowl</span>
							</div>
						</div>
					</div>
					<div className="home-header-spacer"></div>
				</div>
				<PlayerContainer />
			</div>
		)
	}
}

export default Slideshow
