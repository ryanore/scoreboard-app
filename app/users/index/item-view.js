import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'a',
  template: template,
  className: 'users__item list-group-item',

  attributes() {
    return {
      href: `#users/details/${this.model.get('_id')}`
    };
  },

  modelEvents: {
    all: 'render'
  }
});
