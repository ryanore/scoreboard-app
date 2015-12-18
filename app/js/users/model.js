import {Model} from 'backbone';

let UserModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'users',
	validation: null,

	initialize(vals, options = {}) {
		if( options.validation ){
			this.validation = options.validation;
		}
	}
	
});

export default UserModel;