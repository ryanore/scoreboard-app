let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i;

export default {
	title: {
		required: true,
		msg: 'At least 4 characters.'
	},
	description: {
		required: true,
		minLength: 6,
		msg: 'At least 6 characters.'
	},
	include:['title', 'description']
};
