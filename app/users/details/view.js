import FormBehavior from '../../base/forms/form-behavior';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import session from '../../auth/session';

export default ItemView.extend({
  tagName: 'div',
  template: template,
  className: 'users__detail view container',
  initialize() {
  	console.log('this.model ', this.model);
  },
  events: {
  	'submit form': 'onFormSubmit'
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
			allowEdit: session.isUser() || session.level(1)
		};
	},

	onFormSubmit() {
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
