import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import View from './layout-view';
import Collection from '../../../entities/collections/games';
import Session from '../../../entities/session';

let Route = Marionette.Object.extend({

  RootChannel: Radio.channel('RootChannel'),

	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(){
		this.fetch().then((c) => {
	  	Radio.trigger('RootChannel','content:show', new View({collection: c}));
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
	 * Validate User's Permissions
	 * @return {boolean} ONLY admin can see list of users
	 */
	validate() {
		return Session.level(1);
	}
});


export default Route;