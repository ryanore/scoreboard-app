import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import View from './layout-view';
import Collection from '../../../entities/collections/users';
import Session from '../../../entities/session';

let Route = Marionette.Object.extend({
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		if( ! this.validate() ){
			Backbone.history.returnFragment = 'users';
			return Backbone.history.navigate('login', {trigger: true});
		}
		this.container = options.container;
		this.fetch().then((c) => {
			this.container.show(new View({collection: c}));
		});
	},
	

	/**
	 * Fetch Model
	 * @return {Promise}
	 */
	fetch() {     
    let defer = $.Deferred();
    let c = new Collection();
    c.fetch({success: function(){
      defer.resolve(c);
    }});
    return defer;
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
	 * @return {boolean} ONLY admin can see list of users
	 */
	validate() {
		return Session.level(1);
	}
});


export default Route;