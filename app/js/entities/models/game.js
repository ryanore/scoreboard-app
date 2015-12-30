import {Model} from 'backbone';
import Session from '../session';

let GameModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'games',
	errors: [],
	defaults: {
		teams: [],
		score: {},
		title: '',
		owner: Session.user
	},

	initialize(vals, options = {}) {
		if( options.validation ){
			this.validation = options.validation;
		}
	}
});

export default GameModel;