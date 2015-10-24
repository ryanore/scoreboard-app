import {Model} from 'backbone';

let UserModel = Model.extend({
	idAttribute: '_id',
	urlRoot: 'http://localhost:3000/users'
});

export default UserModel;