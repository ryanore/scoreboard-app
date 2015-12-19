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
			errors: this.errors
		};
	},

	onFormSubmit() {
		let frag = Backbone.history.returnFragment || '/';		
		
		this.model.set(this.form);
		this.model.validate();
		if( !this.model.isValid()){
			return false;
		}		

	 	$.ajax({
      url: API + 'login',
      type: 'POST',
      data: this.form
    })
    .done((data, textStatus, jqXHR) => {
      Session.update(data);
      Backbone.history.navigate(frag, {trigger: true});
    })
    .fail((xhr, textStatus, errorThrown) => {
    	if( xhr.status === 401 ){
    		this.errors.push('Bad login attempt. Try again!')
    	}
    	this.render();
    });
	}
});
