import Collection from '../../base/collections/collection';
import User from '../models/user';

let UsersCollection = Collection.extend({
	url: 'http://localhost:3000/users',
	model: User
});

export default UsersCollection;