let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i;

export default {
	title: {
		required: true,
		minLength: 6,
		pattern: stringReg,
		msg: 'At least 6 characters, and No special Characters please.'
	},
	description: {
		required: true,
		minLength: 6,
		msg: 'At least 6 characters.'
	}
};
