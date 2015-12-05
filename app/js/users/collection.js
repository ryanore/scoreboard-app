import Model from './model';
import Collection from '../base/collections/collection';

let UsersCollection = Collection.extend({
	url: 'http://localhost:3000/users',
	model: Model
});

export default UsersCollection;