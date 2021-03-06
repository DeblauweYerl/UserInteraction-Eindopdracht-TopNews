let email = {},
	notifyButton;


const isValidEmailAddress = function(emailAddress) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};


const doubleCheckEmailAddress = function() {
	if (isValidEmailAddress(email.input.value)) {
		email.input.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors(email);
	}
	else {
		if (isEmpty(email.input.value)) {
			email.errorMessage.innerText = 'This field is required';
		} else {
			email.errorMessage.innerText = 'Invalid emailaddress';
		}
	}
};


const addErrors = function(formField) {
	formField.field.classList.add('has-error');
	formField.errorMessage.classList.add('is-visible');
};

const removeErrors = function(formField) {
	formField.field.classList.remove('has-error');
	formField.errorMessage.classList.remove('is-visible');
};


const getDOMElements = function() {
	email.field = document.querySelector('.js-email-field');
	email.errorMessage = document.querySelector('.js-email-error-message');
	email.input = document.querySelector('.js-email-input');

	notifyButton = document.querySelector('.js-notify-button');
};

const enableListeners = function() {
	email.input.addEventListener('blur', function() {
		if (!isValidEmailAddress(email.input.value)) {
			if (isEmpty(email.input.value)) {
				email.errorMessage.innerText = 'This field is required';
			} else {
				email.errorMessage.innerText = 'Invalid emailaddress';
			}
			addErrors(email);
			email.input.addEventListener('input', doubleCheckEmailAddress);
		}
	});

	notifyButton.addEventListener('click', function(e) {
		e.preventDefault();

		if (isValidEmailAddress(email.input.value)) {
			console.log('Form is good to go!');
			location.reload();
		} else {
			addErrors(email);
			email.input.addEventListener('input', doubleCheckEmailAddress);
		}
	});
};


document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	getDOMElements();
	enableListeners();
});