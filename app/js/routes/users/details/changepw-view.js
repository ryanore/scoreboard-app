import FormView from 'base/forms/form-view';
import Session from 'entities/session';
import template from './changepw.hbs';
import {changePassword as validation} from './validation';
import {apiRoot} from 'config';

export default FormView.extend({
  url: apiRoot + 'users/changepassword',
  template: template,
  className: 'users__changepassword_form ',
  initialize() {
    this.model.validation = validation;
  },
  beforeSave() {
    this.form.username = this.model.get('username');
  },
  onErr() {},
  onSuccess() {
    console.log('LOG OUT USER ');
    Session.logOutUser();
    console.log('this.success ', this.success);
    this.render();
  }
});
