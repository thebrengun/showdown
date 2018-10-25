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
									<a href="/#lineup" className="menu-list-link">Lineup</a>
								</li>
								<li className="menu-list-item">
									<a href="/#collaborations" className="menu-list-link">Collaborations</a>
								</li>
								<li className="menu-list-item">
									<a href="/enter" className="menu-list-link">Enter</a>
								</li>
								<li className="menu-list-item">
									<a href="/archive" className="menu-list-link">Past Festivals</a>
								</li>
								<li className="menu-list-item">
									<a href="/#sponsors" className="menu-list-link">Sponsors</a>
								</li>
								<li className="menu-list-item">
									<a href="/tickets" className="menu-list-link tickets-link">Tickets</a>
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