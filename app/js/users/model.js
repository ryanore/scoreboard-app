import {Model} from 'backbone';

let stringReg = /^[^!@#${}%^&*()<>~`;:,.?'"|\[\]\\0-9]*$/i

let UserModel = Model.extend({
	idAttribute: '_id',
	urlRoot: 'http://localhost:3000/users',


  validate(attrs = {}) {
    let errors = [];

    if (attrs.username === '') {
      errors.push('Missing "username" field');
    }

    if (attrs.password === '') {
      errors.push('Missing "password" field');
    }
    if (attrs.email === '') {
      errors.push('Missing "email" field');
    }

    return errors.length > 0 ? errors : undefined;
  }

});

export default UserModel;