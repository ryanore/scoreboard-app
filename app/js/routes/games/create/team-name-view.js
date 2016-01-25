import {ItemView} from 'backbone.marionette';
import template from './team-name.hbs';
export default ItemView.extend({
  template: template,
  className: 'games__create_team',
  events: {
    'click .btn-remove-team': 'removeSelf',
    'change input': 'updateSelf'
  },

  updateSelf() {
    this.model.set('name', this.$el.find('input').val());
  },

  removeSelf() {
    this.model.destroy();
  }
});
