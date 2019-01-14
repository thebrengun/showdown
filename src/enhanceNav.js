import 'classlist-polyfill';
import './Nav/Nav.css';

function enhanceNav(containerId) {
	const container = document.getElementById(containerId);
	const wrapper = container.getElementsByClassName('nav')[0];
	const toggleBtn = container.getElementsByClassName('nav-btn')[0];
	const navEl = container.getElementsByTagName('nav')[0];
	const menuEl = container.getElementsByClassName('ns-menu-list')[0];

	if(!container || !wrapper || !toggleBtn || !navEl || !menuEl) {
		return;
	}

	// We display a very differently styled menu to users without JS
	container.classList.replace('ns-nav-container', 'NavContainer');
	toggleBtn.classList.remove('hide-desktop');
	wrapper.classList.add('closed');
	navEl.classList.add('menu-wrapper');
	navEl.classList.remove('ns-menu-wrapper', 'hide-mobile');
	menuEl.classList.replace('ns-menu-list', 'menu-list');

	// Finally add the toggle handler
	toggleBtn.addEventListener('click', function toggleMenu() {
		const menuOpen = wrapper.classList.contains('open');
		const explicitlyClosed = wrapper.classList.contains('closed');

		if(menuOpen) {
			wrapper.classList.replace('open', 'closed');
		} else if(explicitlyClosed) {
			wrapper.classList.replace('closed', 'open');
		} else {
			wrapper.classList.add('open');
		}
	});
}

export default enhanceNav;