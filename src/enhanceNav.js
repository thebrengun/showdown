import 'classlist-polyfill';
import './Nav/Nav.css';

const addClass = (el, className) => el && el.classList.add(className);
const removeClass = (el, className) => el && el.classList.remove(className);

function enhanceNav(wrapperId, toggleBtnId) {
	const wrapper = document.getElementById(wrapperId);
	const toggleBtn = document.getElementById(toggleBtnId);
	if(!wrapper || !toggleBtn) {
		return;
	}

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