import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import {history} from 'backbone';
import View from './layout-view';
import Collection from '../collection';
import session from '../../auth/session';

let Route = Marionette.Object.extend({
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		if( ! this.validate() ){
			return history.navigate('notfound', {trigger: true});
		}
		this.fetch().then((c) => {
			this.container = options.container;
			this.updateNav();
			this.container.show(new View({collection: c}));
		});
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
	 * Validate User's Permissions
	 * @return {boolean} ONLY admin can see list of users
	 */
	validate() {
		return session.level(1);
	}
});


export default Route;