import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../base/forms/form-behavior';
import template from './changepw.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'form',
	template: template,
	className: 'users__create_form ',

	events: {
		'submit': 'onFormSubmit'
	},

	behaviors: {
		form: { 
			behaviorClass: FormBehavior
		}
	},
	
	templateHelpers() {
		return {
			errors: this.errors
		};
	},

	onFormSubmit() {
		let errors = this.model.validate(this.form);
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
			console.log('this.form ', this.form);
			this.model.set(this.form);
			this.model.save({})
				.done(() => {
					Radio.trigger('UserChannel','user:details:saved');
				})
				.fail(() => {
					alert('error saving model');
				});		
			}
	}
});
