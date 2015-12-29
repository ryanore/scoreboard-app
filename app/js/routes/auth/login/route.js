import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';
import {history} from 'backbone';
import Session from '../../../entities/session';
import User from '../../../entities/models/user';
import View from './view';
import validation from './validation';

let Route = Marionette.Object.extend({
  RootChannel: Radio.channel('RootChannel'),

	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(){
		if( ! this.validate() ){
			return history.navigate('/', {trigger: true});
		}
		
  	Radio.trigger('RootChannel','content:show', new View({
			model: new User( {}, { validation: validation} )
		}));
	},

	/**
	 * Validate User's Permissions
	 * @return {boolean} ONLY if not already logged in
	 */
	validate() {
		return( Session.level() < 0 );
	}

});

export default Route;