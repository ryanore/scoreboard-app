import $ from 'jquery';
import Marionette from 'backbone.marionette';
import {history} from 'backbone';
import session from '../../auth/session';
import Model from '../model';
import View from './layout-view';

let Route = Marionette.Object.extend({
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * @return  {null}
	 */
	initialize(options){
		this._id = options._id;
		this.container = options.container;

		if( ! this.validate() ){
			return history.navigate('notfound', {trigger: true});
		}

		this.fetch().then((m) => {
			this.container.show(new View({model: m}));
		});
	},

	/**
	 * Fetch Model
	 * @return {Promise}
	 */
	fetch() {     
    let defer = $.Deferred();
    let m = new Model({_id: this._id});
    m.fetch({success: function(){
      defer.resolve(m);
    }});
    return defer;
	},


	/**
	 * Validate User's Permissions
	 * @return {boolean} User can only edit thier own account (unless admin)
	 */
	validate() {
 		return( session.isUser(this._id) || session.level(1));
	}

});


export default Route;