import React, { PureComponent } from 'react';
import './Nav.css';

class Nav extends PureComponent {
	state = {open: false};

	handleToggle = (e) => {
		this.setState({open: !this.state.open});
	};

	render() {
		return (
			<div className="NavContainer">
				<div className={`nav ${this.state.open ? 'open' : 'closed'}`}>
					<button className="nav-btn" onClick={this.handleToggle}>
						<span className="u-hidden">Toggle Nav</span>
					</button>
					<nav className="menu-wrapper">
						<div className="menu">
							<ul className="menu-list">
								<li className="menu-list-item">
									<a href="/#festival" className="menu-list-link">Festival</a>
								</li>
								<li className="menu-list-item">
									<a href="/#winning-collaborations" className="menu-list-link">Winning Collaborations</a>
								</li>
								<li className="menu-list-item">
									<a href="/submit" className="menu-list-link">Submit</a>
								</li>
								<li className="menu-list-item">
									<a href="/past-festivals" className="menu-list-link">Past Festivals</a>
								</li>
								<li className="menu-list-item">
									<a href="/#sponsors" className="menu-list-link">Sponsors</a>
								</li>
								<li className="menu-list-item">
									<a href="https://www.brooklynbowl.com/event/1785560-silver-sound-showdown-music-brooklyn/" target="_blank" rel="noopener noreferrer" className="menu-list-link tickets-link">Tickets</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default Nav;