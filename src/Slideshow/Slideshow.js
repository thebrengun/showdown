import React, { Component } from 'react';
import './Slideshow.css';
import PlayerContainer from './PlayerContainer/PlayerContainer';

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
				<PlayerContainer />
			</div>
		)
	}
}

export default Slideshow
