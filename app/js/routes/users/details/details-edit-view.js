import Radio from 'backbone.radio';
import FormView from 'base/forms/form-view';
import Session from 'entities/session';
import template from './details-edit.hbs';
import {edit as validation} from './validation';

let UserChannel = Radio.channel('UserChannel');

export default FormView.extend({
  template: template,
  className: 'users__edit_form ',
  initialize() {
    this.model.validation = validation;
  },

  beforeSave() {
    this.form.username = Session.user.username;
  },

  onSuccess() {
    Radio.trigger('UserChannel', 'user:updated');
  },

  onErr() {
    this.model.errors.push('There was a problem saving...');
  },
  templateHelpers() {
    let helpers = FormView.prototype.templateHelpers.call(this);
    helpers.editMode = true;
    return helpers;
  }
});
