import {ItemView} from 'backbone.marionette';
import {Collection} from 'backbone';
import {Radio} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  tagName: 'footer',
  className: 'btn-group btn-group-justified',

  NavChannel: Radio.channel('NavChannel'),
    
  collectionEvents: {
    'all': 'render'
  },
  
  initialize(options) {
  	options.container.show(this);
  	this.listenTo(this.NavChannel, 'footer:update', this.update);
  },

  update(items) {
  	this.collection.reset();
  	this.collection.set(items);
  }
});
