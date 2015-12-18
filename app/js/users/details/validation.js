let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i;

export default {
	changePassword: {
		password: {
			required: true
		},
		newPassword: {
			required: true,
			minLength: 8,
			msg: 'Password must be at least 8 characters'
		},
		password_confirm: {
			required: true,
			equalTo: 'newPassword'
		}
	},
	edit: {
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
}

};
