import {ItemView} from 'backbone.marionette';
import {Collection} from 'backbone';
import {Radio} from 'backbone';
import template from './template.hbs';
export default ItemView.extend({
  template: template,
  tagName: 'footer',
  className: 'btn-group btn-group-justified',

  NavChannel: Radio.channel('NavChannel'),
  RootChannel: Radio.channel('RootChannel'),

  collectionEvents: {
    'all': 'render'
  },

  initialize(options) {
    this.collection = new Collection();
    this.listenTo(this.NavChannel, 'footer:update', this.update);
    Radio.trigger('RootChannel', 'footer:show', this);
  },

  update(items) {
    this.collection.reset();
    this.collection.set(items);
  }
});
