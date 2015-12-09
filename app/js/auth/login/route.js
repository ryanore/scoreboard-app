import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';
import {history} from 'backbone';
import Session from '../session';
import User from '../../users/model';
import View from './view';

let Route = Marionette.Object.extend({
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		this.container = options.container;
		if( ! this.validate() ){
			return history.navigate('/', {trigger: true});
		}
		this.container.show(new View({model: new User()}));		
	},


	/**
	 * Tell the nav what to do
	 * @return {null}
	 */
	updateNav() {
		Radio.trigger('NavChannel','header:item:activate', 'login');
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