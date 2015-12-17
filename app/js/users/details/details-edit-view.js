import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import FormBehavior from '../../base/forms/form-behavior';
import template from './details-edit.hbs';
import {history} from 'backbone';
import validation from './validation';

let	UserChannel = Radio.channel('UserChannel');

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__create_form ',
	errors: [],
	events: {
		'submit form': 'onFormSubmit'
	},

	behaviors: {
		form: { 
			behaviorClass: FormBehavior
		}
	},
	
	onFormSubmit(e) {
		let _this = this;		
		e.preventDefault();
		this.errors = [];
		this.model.set(this.form);
		this.model.validate();

		if( !this.model.isValid()){
			return false;
		}

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
