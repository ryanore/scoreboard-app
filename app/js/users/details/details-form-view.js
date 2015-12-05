import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../base/forms/form-behavior';
import template from './details-form.hbs';
import {history} from 'backbone';
import Radio from 'backbone.radio';

let	UserChannel = Radio.channel('router');

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__create_form ',

	initialize() {
		console.log('init ', this.model.attributes);
	},
	events: {
		'submit form': 'onFormSubmit'
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
		let errors = this.model.validate_details(this.form);
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
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
