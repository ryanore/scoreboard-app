import {LayoutView} from 'backbone.marionette';
import Session from 'entities/session';
import {errMap} from 'utils/form';
import FormBehavior from './form-behavior';
export default LayoutView.extend({
  className: 'view users__create',
  form: {},
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
    this.render();
  },

  /**
   * Abstract callback for overriding, fired if save fails.   
   * @return {null}
   */
  onErr() {
    console.log('onErr in base class should be overridden ');
    this.render();
  },

  /**
   * Save with Jquery Ajax, in cases where non-RESTful requests are used.
   * @return {null}
   */
  saveAjax() {
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
    this.model.save(null, {
      success: (mod) => {
        this.success = true;
        this.el.classList.remove('loading');
        this.onSuccess(mod);
      },
      error: (mod, promise, xhr) => {
        errMap(xhr.xhr.responseText, this.model.errors);
        this.success = false;
        this.el.classList.remove('loading');
        this.onErr(mod);
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

    if (!this.model.isValid()) {
      return false;
    }

    this.beforeSave();
    this.el.classList.add('loading');

    if (this.model.errors.length) {
      this.el.classList.remove('loading');
      return this.render();
    }

    if (this.url) {
      this.saveAjax();
    } else {
      this.saveModel();
    }

    return true;
  }
});
