import {ItemView} from 'backbone.marionette';
import Syphon from 'backbone.syphon';
import {history} from 'backbone';
import Session from '../../auth/session';
import FormBehavior from '../../base/forms/form-behavior';
import template from './changepw.hbs';
import {changePassword as validation} from './validation';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__changepassword_form ',
	success: false,
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
			success: this.success,
		};
	},

	onFormSubmit(e) {
		e.preventDefault();
		let _this = this;		
		this.errors = [];
		this.form.username = Session.user.username;
		this.model.set(this.form);

		if( !this.model.isValid() || this.loading === true){
			return false;
		}

		this.el.classList.add('loading');

		$.ajax({
		  url: API + 'users/changepassword',
		  type: 'POST',
		  data: this.form
		})
		.done(function(data, textStatus, jqXHR) {
			Session.logOutUser();
			_this.success = true;
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			_this.success = false;
		  _this.errors.push('Oh no, there was a problem!');
		})
		.always(function(){
			_this.render();
		});
	}
});
