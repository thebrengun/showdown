import React, { PureComponent } from 'react';
import './ColorScroll.css';

class ColorScroll extends PureComponent {
	state = {offset: 0};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (e) => {
		this.setState({offset: window.scrollY * 1.5});
	};

	render() {
		return (
			<div 
				className="ColorScroll" 
				style={{
					backgroundPosition: `0px ${this.state.offset}px`
				}}
			>
			</div>
		);
	}
}

export default ColorScroll;