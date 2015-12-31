import {Model} from 'backbone';
import Session from '../session';

let GameModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'games',
	errors: [],
	defaults: {
		teams: [],
		title: '',
		owner: Session.user,
		score: {}
	}
});

export default GameModel;