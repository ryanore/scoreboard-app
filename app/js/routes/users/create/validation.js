export default {
	username: {
		required: true,
		minLength: 6,
		msg: 'At least 6 characters.'
	},
	email: {
		pattern: 'email',
		msg: 'Please enter a valid email',
		minLength: 2,
		required: true
	},
	password: {
		required: true,
		minLength: 8,
		msg: 'At least 8 characters'
	},
	password_confirm: {
		required: true,
		equalTo: 'password',
		msg: 'Must match password.'
	}
};
