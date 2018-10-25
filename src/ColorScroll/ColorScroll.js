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
		/*
			In the header.php a <noscript> tag containing an empty div with 
			the class "ColorScroll" is rendered so that the background image  
			will be shown regardless of javascript being enabled. If you need 
			to change this className attribute, please also change it there! 
		*/
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