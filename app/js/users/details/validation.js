let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i;

export default {
	username: {
		required: true,
		minLength: 6,
		pattern: stringReg,
		msg: 'At least 6 characters, and No special Characters please.'
	},
	firstName: {
		required: false,
		pattern: stringReg,
		minLength: 2
	},
	lastName: {
		required: false,
		pattern: stringReg,
		minLength: 2
	},
	email: {
		pattern: 'email',
		msg: 'Please enter a valid email',
		minLength: 2,
		required: true
	}
};
