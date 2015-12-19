import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../../base/forms/form-behavior';
import template from './template.hbs';
import Session from '../../../entities/session';
import {errMap} from '../../utils/form';
import {validation} from './validation';

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

	initialize() {
		this.model.validation = validation;
	},

	templateHelpers() {
		return {
			errors: this.errors,
			success: this.success
		};
	},

	onFormSubmit(e) {
		e.preventDefault();
		this.errors = [];
		this.model.set(this.form);
		
		if( !this.model.isValid()){
			return false;
		}		
		console.log('valid ');
		this.loading = true;
		this.success = false;
		this.el.classList.add('loading');


		this.model.save(null,{
			success: (mod) => {
				console.log('success');
				this.success = true;
				this.el.classList.remove('loading');
				this.render();
			},
			error: (mod, promise, xhr) => {
				console.log('error');
				errMap(xhr.xhr.responseText, this.errors);
				this.success = false;
				this.el.classList.remove('loading');
				this.render();
			}
		})
	}
});
