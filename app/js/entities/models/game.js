import {Model} from 'backbone';
import Session from '../session';

let GameModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'games',
	validation: null,
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
	},
	validate() {
		console.log('validate game ');
		if( !this.get('teams').length > 1){
			this.model.errors.push('more teams!');
			return false;
		}
		return true;
	}
	
});

export default GameModel;