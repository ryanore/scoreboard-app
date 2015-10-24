import Marionette from 'backbone.marionette';
import $ from 'jquery';
import {history} from 'backbone';
import View from './view';
import Model from '../model';
import session from '../../auth/session';

let Route = Marionette.Object.extend({
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		this.container = options.container;

		if( ! this.validate() ){
			return history.navigate('notfound', {trigger: true});
		}

		this.container.show(new View({model: new Model()}));
	},


	/**
	 * Validate User's Permissions
	 * @return {boolean} ONLY admin can create users
	 */
	validate() {
 		return( session.level(1));
	}

});


export default Route;