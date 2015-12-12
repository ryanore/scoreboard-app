import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';
import View from './view';
import Model from '../model';
import Session from '../../auth/session';

let Route = Marionette.Object.extend({
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		if( ! this.validate() ){
			return Backbone.history.navigate('/', {trigger: true});
		}
		this.container = options.container;
		this.container.show(new View({model: new Model()}));
	},

	/**
	 * Tell the nav what to do
	 * @return {null}
	 */
	updateNav() {
		Radio.trigger('NavChannel','header:item:activate', 'users');
	},

	/**
	 * Validate User's Permissions
	 * @return {boolean} Must be admin, or not logged in
	 */
	validate() {
		return( Session.level() < 0   ||  Session.level(1));
	}

});

export default Route;