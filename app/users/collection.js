import Model from './model';
import {Collection} from 'backbone';

let UsersCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/users',
	model: Model
});

export default UsersCollection;