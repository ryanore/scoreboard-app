import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import FormBehavior from '../../base/forms/form-behavior';
import session from '../../auth/session';
import {formatDate} from '../../utils/date';
import template from './template.hbs';
import EditView from './details-form-view';
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

  initialize() {
		this.listenTo(UserChannel, {
			'user:details:saved': this.updateMode
		});
  },

	getDisplayName() {
		if( this.model.get('firstName') || this.model.get('lastName') ){
			return this.model.get('firstName') +' '+ this.model.get('lastName') ;
		} else {
			return this.model.get('username');
		}
	},

	templateHelpers() {
		return {
			errors: this.errors,
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			allowEdit: session.isUser() || session.level(1),
			allowDelete: session.isUser() || session.level(1),
			displayName: this.getDisplayName()
		};
	},
 
	onRender() {
		this.updateMode('list');
  },

	handleClickToggle(e) {
		var mode = e.target.getAttribute('data-toggle');
		if( this.mode === mode ){
			mode = 'cancel';
		}
		this.updateMode(mode);
	},

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
