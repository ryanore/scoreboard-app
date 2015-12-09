import FormBehavior from '../../base/forms/form-behavior';
import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Session from '../../auth/session';
import {errMap} from '../../utils/form';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'view users__create',
	
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
		this.errors = [];
		let errors = this.model.validate_create(this.form);
		
		if (errors) {
			this.errors = errors;
			this.render();
		} 
		else {
			let _this = this;
			this.model.save(this.form,{
				success: function(mod) {
					Backbone.history.navigate('users/details/'+mod.get('_id'), {trigger: true});
				},
				error: function(mod, promise, xhr) {
					_this.errors = errMap( xhr.xhr.responseText, _this.errors );
					_this.render();
				}
			});
		}
	}
});
