import {ItemView} from 'backbone.marionette';
import Syphon from 'backbone.syphon';
import template from './changepw.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'form',
	template: template,
	className: 'users__create_form ',
	form: {},
	errors: [],
	events: {
		'submit': 'onFormSubmit'
	},

	initialize() {
		console.log('init cpw');
	},

	templateHelpers() {
		return {
			errors: this.errors
		};
	},

	validate() {
		console.log('Validate ', this.form);
		_.each(this.form, (i, e) => {
			if( !i.length ){
				this.errors.push('All fields required');
				return;
			}
		})
		if( this.form.password !== this.form.password_confirm ) {
			this.errors.push('Passwords don\'t match');
		}
		else {
			console.log(' Valid Form' );
		}

	},

	onFormSubmit(e) {
		e.preventDefault();
		console.log('this ', this.errors);
		this.form = Syphon.serialize(this);
		this.errors = this.validate();
		// if (this.errors.length) {
		// 	this.render();
		// } else {
		// 	$.ajax({
		// 	  url: API + 'login',
		// 	  type: 'POST',
		// 	  data: formData
		// 	})
		// 	.done(function(data, textStatus, jqXHR) {
		// 	  Session.update(data);
		// 	  Backbone.history.navigate(frag, {trigger: true});
		// 	})
		// 	.fail(function(jqXHR, textStatus, errorThrown) {
		// 	  alert('fail');
		// 	});
		// }
	}
});
