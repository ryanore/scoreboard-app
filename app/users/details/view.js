import FormBehavior from '../../base/forms/form-behavior';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import session from '../../auth/session';
import {formatDate} from '../../utils/date';

export default ItemView.extend({
  tagName: 'div',
  template: template,
  className: 'users__detail view container',
 
  events: {
  	'submit form': 'onFormSubmit',
  	'click .btn-delete-user': 'handleClickDelete',
  	'click .btn-edit-profile': 'handleClickEdit',
  	'click .btn-change-pw': 'handleClickPassword'
  },
  
  modelEvents: {
    all: 'render'
  },
  
	behaviors: {
		form: { 
			behaviorClass: FormBehavior
		}
	},
	
	templateHelpers() {
		return {
			errors: this.errors,
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			allowEdit: session.isUser() || session.level(1),
			allowDelete: session.isUser() || session.level(1)
		};
	},

	handleClickEdit() {
		alert('edit');
	},

	handleClickDelete() {
		alert('delete');
	},

	handleClickPassword() {
		alert('handleClickPassword');
	},

	onFormSubmit() {
		alert('submit')
		let errors = this.model.validate(this.form);
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
			this.model.set(this.form);
			this.model.save({})
				.fail(() => {
					alert('error saving model');
				});
		}
	}
});
