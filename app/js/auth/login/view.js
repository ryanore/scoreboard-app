import FormBehavior from '../../base/forms/form-behavior';
import {Backbone} from 'backbone';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'view users__login',
	
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
		let errors = this.model.validate_login(this.form);
		if (errors) {
			this.errors = errors;
			this.render();
		} else {
		 $.ajax({
        url: API + 'login',
        type: 'POST',
        data: this.form
      })
      .done(function(data, textStatus, jqXHR) {
        session.update(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert('fail');
      });
		}
	}
});
