import Backbone from 'backbone';
import FormView from 'base/forms/form-view';
import validation from './validation';
import template from './template.hbs';

export default FormView.extend({
  template: template,
  className: 'view users__create',
  onSuccess() {
    Backbone.history.navigate(`users/details/${this.model.get('_id')}`, {trigger:true});
  },
  onErr() {

  },
  initialize() {
    this.model.validation = validation;
  }
});
