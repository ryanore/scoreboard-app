import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../base/forms/form-behavior';
import template from './details-form.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__create_form ',

	events: {
		'submit form': 'onFormSubmit'
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
				.done(() => {})
				.fail(() => {
					alert('error saving model');
				});
		}
	}
});
