import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
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
		this.updateNav();
		this.container.show(new View({model: new Model()}));		
	},
	
	/**
	 * Update header/footer links in context to this route
	 */
	updateNav() {
		Radio.trigger('NavChannel','footer:update', [{
			label: 'About',
			path: 'about'
		}]);
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