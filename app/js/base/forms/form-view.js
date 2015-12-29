import {LayoutView} from 'backbone.marionette';
import FormBehavior from './form-behavior';
import Session from '../../entities/session';
import {errMap} from '../../utils/form';

export default LayoutView.extend({
	className: 'view users__create',
	
	events: {
		'submit form': 'onFormSubmit'
	},

	behaviors: {
		form: { 
			behaviorClass: FormBehavior
		}
	},

	/**
	 * Send props into template for rendering (Marionette Provided)
	 * @return {Object}
	 */
	templateHelpers() {
		return {
			errors: this.model.errors,
			success: this.success
		};
	},

	/**
	 * Abstract hook for overriding before sending form.
	 * @return {null}
	 */
	beforeSave() {
		console.log('beforeSave in base class should be overridden ');
	},

	/**
	 * Abstract callback for overriding, fired if saved successfully		
	 * @return {null}
	 */
	onSuccess() {
		console.log('onSuccess in base class should be overridden ');
	},

	/**
	 * Abstract callback for overriding, fired if save fails.		
	 * @return {null}
	 */
	onErr() {
		console.log('onErr in base class should be overridden ');
	},

	/**
	 * Save with Jquery Ajax, in cases where non-RESTful requests are used.
	 * @return {null}
	 */
	saveAjax() {
		console.log('saveAjax ');
		$.ajax({
		  url: this.url,
		  type: 'POST',
		  data: this.form
		})
		.done((data, textStatus, jqXHR) => {
			this.success = true;
			this.onSuccess();
		})
		.fail((jqXHR, textStatus, errorThrown) => {
			this.success = false;
			this.onErr();
		})
	},

	/**
	 * Save Backbone Model - firing all the hooks and callbacks
	 * @return {null}
	 */
	saveModel() {
		console.log('saveModel ');
		this.model.save(null,{
			success: (mod) => {
				this.success = true;
				this.onSuccess();
				console.log('SUCCESS 1 mod', mod);
				this.el.classList.remove('loading');
				console.log('SUCCESS 2 el', this.el);
				this.render();
			},
			error: (mod, promise, xhr) => {
				errMap(xhr.xhr.responseText, this.model.errors);
				this.success = false;
				this.el.classList.remove('loading');
				this.onErr();
				console.log('ERRORS ', this.model.errors);
				this.render();
			}
		})	
	},


	/**
	 * Submit handler sets props which triggers validation.  
	 * It delegates saving to it's own model.
	 * @param  {Event} e Form submit Event
	 * @return {Boolean} 
	 */
	onFormSubmit(e) {
		e.preventDefault();
		this.model.errors = [];
		this.model.set(this.form);
		
		if( !this.model.isValid()){
			return false;
		}		

		this.loading = true;
		this.el.classList.add('loading');
		this.beforeSave();

		if( this.model.errors.length ){
			return this.render();
		}		

		if( this.url ){
			this.saveAjax();
		} else {
			this.saveModel();
		}

		return true;
	}
});
