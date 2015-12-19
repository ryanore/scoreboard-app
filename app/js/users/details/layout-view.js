import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import FormBehavior from '../../base/forms/form-behavior';
import Session from '../../entities/session';
import {formatDate} from '../../utils/date';
import template from './layout-template.hbs';
import EditView from './details-edit-view';
import ListView from './details-list-view';
import ChangePwView from './changepw-view';
import DeleteUserView from './delete-user-view';

let	UserChannel = Radio.channel('UserChannel');


export default LayoutView.extend({
  tagName: 'div',
  template: template,
  className: 'users__detail view toggle-mode container',

 	regions: {
 		details: '.user__details_area'
 	},

  events: {
  	'click [data-toggle]': 'handleClickToggle'
  },

  /**
   * Init Class - Marionette method
   * @return {null}
   */
  initialize() {
  	this.listenTo(UserChannel, 'user:updated', this.render);
  },


	/**
	 * Add Variables to template - Marionette method.
	 * @return {Object}
	 */
	templateHelpers() {
		let isUser = Session.isUser(this.model.get('_id'));
		return {
			errors: this.errors,
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			allowEdit: isUser || Session.level(1),
			allowDelete: isUser || Session.level(1),
			displayName: this.getDisplayName()
		};
	},
 

 	/**
 	 * Render callback - Marionette method
 	 * @return {null}
 	 */
	onRender() {
		this.updateMode('list');
  },


  /**
   * Get the name to display in the header.
   * If the user didn't provide first or last, display username
   * @return {String}
   */
	getDisplayName() {
		if( this.model.get('firstName') || this.model.get('lastName') ){
			return this.model.get('firstName') +' '+ this.model.get('lastName') ;
		} else {
			return this.model.get('username');
		}
	},


  /**
   * Click handler - anything with data-toggle attribute switches the region content
   * @return {null}
   */
	handleClickToggle(e) {
		var mode = e.target.getAttribute('data-toggle');
		if( this.mode === mode ){
			mode = 'cancel';
		}
		this.updateMode(mode);
	},


	/**
	 * Switching modes by changing the content in the Details Region
	 * @param  {String} mode Which mode should we be in (List, Change Password, Edit, Delete)
	 * @return {null}
	 */
	updateMode(mode = 'list'){
		var view;
		this.$el.attr('data-mode', mode);	
		this.mode = mode;	
		switch(mode){
			case 'changepw':
				view = new ChangePwView({model: this.model});
				break;

			case 'edit':
				view = new EditView({model: this.model});
				break; 

			case 'delete':
				view = new DeleteUserView({model: this.model});
				break; 

			default:
				view = new ListView({model: this.model});
				break;
		}
		this.getRegion('details').show(view);
	}

});
