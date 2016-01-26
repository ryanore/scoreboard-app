import Collection from 'base/collections/collection';
import User from 'entities/models/user';
import {apiRoot} from 'config';

let UsersCollection = Collection.extend({
  url: apiRoot+'users',
  model: User
});

export default UsersCollection;
