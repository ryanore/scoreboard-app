import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import Session from '../../../entities/session';
import User from '../../../entities/models/user';
import View from './layout-view';

let Route = Marionette.Object.extend({
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * If there is no id passed in, default to the current user
	 * @return  {null}
	 */
	initialize(options){
		this._id = options._id;
		this.container = options.container;

		if( ! this.validate() ){
			return Backbone.history.navigate('login', {trigger: true});
		}

		this.fetch().then((m) => {
			this.updateNav();
			this.container.show(new View({model: m}));
		});
	},


	/**
	 * Fetch Model
	 * @return {Promise}
	 */
	fetch() {     
    let defer = $.Deferred();
    let m = new User({_id: this._id});
    m.fetch({
    	success: function(){
      	defer.resolve(m);
    	},
    	error: function(){
    		return Backbone.history.navigate('notfound', {trigger: true});
    	}});
    return defer;
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
	 * @return {boolean} User can only edit thier own account (unless admin)
	 */
	validate() {
		if( !this._id ){
			console.log('noid ');
		}
 		else{
 			return( Session.isUser(this._id) || Session.level(1));
 		}
	}

});

export default Route;

