import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import FormBehavior from '../../../base/forms/form-behavior';
import template from './details-edit.hbs';
import {history} from 'backbone';
import {edit as validation} from './validation';

let	UserChannel = Radio.channel('UserChannel');

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__edit_form ',
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

	onFormSubmit(e) {
		e.preventDefault();
		this.errors = [];
		this.model.set(this.form);

		if( !this.model.isValid() || this.loading === true){
			return false;
		}

		this.loading = true;
		this.el.classList.add('loading');

		this.model.save(null,{
			success: (mod) => {
				Radio.trigger('UserChannel','user:updated');
			},
			error: () => {
				this.errors = ['There was a problem saving...'];
				this.render();
			}
		});
	}
});
