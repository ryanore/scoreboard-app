let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i;

export default {
	username: {
		required: true,
		minLength: 6,
		pattern: stringReg,
		msg: 'At least 6 characters, and No special Characters please.'
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
		msg: 'Password must be at least 8 characters'
	},
	password_confirm: {
		required: true,
		equalTo: 'password'
	}
};
