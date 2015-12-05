import FormBehavior from '../../base/forms/form-behavior';
import template from '../common/user-details-form.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'form',
	template: template,
	className: 'users__create_form',
	
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
		let errors = this.model.validate(this.form);

		if (errors) {
			this.errors = errors;
			this.render();
		} else {
			this.model.set(this.form);
			this.model.save({})
				.done(() => {
					history.navigate('users', { trigger: true });
				})
				.fail(() => {
					alert('error saving model');
				});
		}
	}
});