import {Model} from 'backbone';

let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i

let UserModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'users',


  validate_create(attrs) {
    let errors = [];
    if (attrs.username === '') {
      errors.push('Missing "username" field');
    }
    if (attrs.password === '') {
      errors.push('Missing "password" field');
    }
    if (attrs.password_confirm !== attrs.password) {
    	console.log(' ', attrs);
      errors.push('Password confirm field does not match!');
    }
    if (attrs.email === '') {
      errors.push('Missing "email" field');
    }

    return errors.length > 0 ? errors : undefined;
  },


  validate_details(attrs) {
    let errors = [];
    if (attrs.username === '') {
      errors.push('Missing "username" field');
    }
    if (attrs.email === '' ) {
      errors.push('Missing "email" field');
    }
    return errors.length > 0 ? errors : undefined;
  },


  validate_password(attrs) {
    let errors = [];
    if (attrs.password === '') {
      errors.push('Missing "password" field');
    }
    if (attrs.confirm_password !== attrs.password) {
    	console.log(' ', attrs);
      errors.push('Missing "password" field');
    }
    return errors.length > 0 ? errors : undefined;
  },

  validate_login(attrs) {
    let errors = [];
    if (attrs.password === '') {
      errors.push('Missing "password" field');
    }
    if (attrs.username === '') {
      errors.push('Missing "username" field');
    }
    return errors.length > 0 ? errors : undefined;
  }

});

export default UserModel;