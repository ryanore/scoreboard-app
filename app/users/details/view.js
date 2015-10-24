import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  tagName: 'div',
  template: template,
  className: 'users__detail view',

  modelEvents: {
    all: 'render'
  }
});
