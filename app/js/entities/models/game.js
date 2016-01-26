import {Model} from 'backbone';
import Session from '../session';
import {apiRoot} from 'config';
console.log('apiRoot ', apiRoot);
let GameModel = Model.extend({
  idAttribute: '_id',
  urlRoot: apiRoot + 'games',
  errors: [],
  defaults: {
    teams: [],
    title: '',
    owner: Session.user,
    score: {}
  }
});

export default GameModel;
