import 'classlist-polyfill';

// enchanceEntryForms makes the default WooCommerce product add on forms more usable 
// out of the box with the presentation we desire. In the future, it would be 
// preferable to change the html structure of the form and do more of this with CSS 
// selectors. It would be nice, also to do the form validation asynchronously rather 
// than with a page refresh.

const blurredClassName = 'blurred';
const focusedClassName = 'focused';
const hiddenClassName = 'u-hidden';
const focusEl = (el) => el && el.focus();
const addClass = (el, className) => el && el.classList.add(className);
const removeClass = (el, className) => el && el.classList.remove(className);
const hideLabel = (label) => addClass(label, hiddenClassName);
const showLabel = (label) => removeClass(label, hiddenClassName);
const hideIf = (label, hide) => hide ? hideLabel(label) : showLabel(label);
const focusInFormRow = (formRow) => addClass(formRow, focusedClassName);
const focusOutFormRow = (formRow) => removeClass(formRow, focusedClassName);
const fieldHasValue = (field) => field && field.value && /\S/.test(field.value);
const addListener = (el, eName, eHandler) => el && el.addEventListener(eName, eHandler);

function enhanceEntryForms() {
	const formRows = document.querySelectorAll('.form-row');

	if(formRows) {
		formRows.forEach(
			(formRow) => {
				const input = formRow.getElementsByTagName('input')[0];
				const select = formRow.getElementsByTagName('select')[0];

				// We don't want to hide labels for radios or checkboxes because labels
				// wrap those inputs nor do we apply magenta bottom border style
				if(select || (input && (input.type === 'radio' || input.type === 'checkbox'))) {
					return;
				}

				const label = formRow.getElementsByTagName('label')[0];
				const textarea = formRow.getElementsByTagName('textarea')[0];
				const field = input || textarea;

				// absolutely position since not wrapping radio or checkbox
				addClass(label, 'placeholder');
				hideIf(label, fieldHasValue(field));
				addClass(formRow, blurredClassName);
				addListener(label, 'click', (e) => focusEl(field));
				addListener(field, 'focusin', (e) => focusInFormRow(formRow));
				addListener(field, 'focusout', (e) => focusOutFormRow(formRow));
				addListener(field, 'change', (e) => hideIf(label, fieldHasValue(field)));
			}
		);
	}
}

export default enhanceEntryForms;