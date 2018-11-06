import 'classlist-polyfill';

function enhanceEntryForms() {
	const form_rows = document.querySelectorAll('.form-row');

	if(form_rows) {
		form_rows.forEach(
			(form_row) => {
				const label = form_row.getElementsByTagName('label')[0];
				const input = form_row.getElementsByTagName('input')[0];
				const textarea = form_row.getElementsByTagName('textarea')[0];
				const field = input || textarea;
				if(label && field) {
					label.addEventListener('click', function(e) {
						field.focus();
					});
				}

				if(field) {
					field.addEventListener('focusin', function() {
						form_row.classList.add('focused');
					});

					field.addEventListener('focusout', function() {
						form_row.classList.remove('focused');
						console.log('handle change');
						const val = field.value.trim();
						console.log(val);
						if(val.length && label) {
							label.classList.add('u-hidden');
						} else if(label) {
							label.classList.remove('u-hidden');
						}
					});
				}
			}
		);
	}
}

export default enhanceEntryForms;