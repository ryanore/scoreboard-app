import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../../base/forms/form-behavior';
import Session from '../../../entities/session';
import template from './template.hbs';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'view users__login',
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
			errors: this.errors,
			success: this.success
		};
	},


	onFormSubmit(e) {
		e.preventDefault();
		let _this = this;		
		this.errors = [];
		this.model.set(this.form);

		if( !this.model.isValid() || this.loading === true){
			return false;
		}

		this.loading = true;
		this.success = false;
		this.el.classList.add('loading');

	 	$.ajax({
      url: API + 'users/forgotpassword',
      type: 'POST',
      data: this.form
    })
    .done((data, textStatus, jqXHR) => {
      this.success = true;
    })
    .fail((xhr, textStatus, errorThrown) => {
    	if( xhr.status === 401 ){
    		this.success = false;
    		this.errors.push('Bad request. Try again!')
    	}
    })
    .always(() => {
			this.loading = true;
     	this.render();
    });
	}
});
