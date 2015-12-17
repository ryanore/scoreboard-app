import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../base/forms/form-behavior';
import template from './template.hbs';
import Session from '../../auth/session';
import {errMap} from '../../utils/form';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'view users__create',
	errors: [],
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
		let _this = this;		
		e.preventDefault();

		this.model.set(this.form);
		this.model.validate();
		
		if( !this.model.isValid()){
			return false;
		}		

		this.model.save({},{
			success: function(mod) {
				Backbone.history.navigate('users/details/'+mod.get('_id'), {trigger: true});
			},
			error: function(mod, promise, xhr) {
				errMap(xhr.xhr.responseText, _this.errors);
				console.log('_this.errors ', _this.errors);
				_this.render();
			}
		});
	}
});
