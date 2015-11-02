import Validation from 'backbone.validation';
import {Backbone} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  tagName: 'div',
  template: template,
  className: 'users__create container',
	
	events: {
		'submit': 'onFormSubmit'
	},

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  onRender() {
  	Validation.bind(this);
		this.$el.find('.form-control').each( function(i,el){
			el.setAttribute('data-error-style', 'tooltip');
		});

  },
  
  onSuccess(user) {
  	alert('success');
  },
  
  onSaveError(model, response) {
  	console.log('ON ERROR ');
  	let self = this;
		let errors = response.responseJSON.errors;
		_.each(errors, function(val, attr){
       Backbone.Validation.callbacks.invalid(self, attr, val.error, 'name');
		});
		self.model.trigger('validated', false, self.model, errors);
		self.model.trigger('validated:invalid', self.model, errors);
  },


  onFormSubmit(e) {  	
  	e.preventDefault();
    let self = this;
    this.$el.find('input[name], select[name]').each( (i, input) => {    	
    	let $input = $(input);
			if( $input.is('[type="checkbox"]')){
				this.model.set(this.name, $input.is(':checked'));
			}
			else{
				this.model.set(input.name, input.value);
			}
		});

		this.model.unset('confirm_password');

		this.model.save({},{
			success: self.onSuccess,
			error: function(){
				alert('err')
			}
		});
	}
});
