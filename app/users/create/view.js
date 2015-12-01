import FormBehavior from '../../base/forms/form-behavior';
import {Backbone} from 'backbone';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__create container',
	
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
