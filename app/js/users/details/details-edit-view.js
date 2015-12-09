import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../base/forms/form-behavior';
import template from './details-edit.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__create_form ',

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

	onFormSubmit(e) {
		e.preventDefault();
		let errors = this.model.validate_details(this.form);
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
			this.model.set(this.form);
			this.model.save({},{
				success: (mod) => {
					console.log('success ');
				},
				error: () => {
					this.errors = ['There was a problem saving...'];
					this.render();
				}
			});
		}
	}
});
