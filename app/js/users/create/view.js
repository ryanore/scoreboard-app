import FormBehavior from '../../base/forms/form-behavior';
import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Session from '../../auth/session';

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
		let errors = this.model.validate_create(this.form);
		let frag = Backbone.history.returnFragment || 'users';
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
			this.model.set(this.form);
			this.model.save({},{
				success: function(mod){
					Backbone.history.navigate('users/details/'+mod.get('_id'), {trigger: true});
        	// Backbone.history.navigate(frag, {trigger: true});
				},
				error: function(){
					this.errors = ['There was a problem saving...'];
					this.render();
				}
			});
		}
	}
});
