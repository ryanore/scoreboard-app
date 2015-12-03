import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import {Events} from 'backbone';
import {Model} from 'backbone';
import {Collection} from 'backbone';
import {Radio} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  
  tagName: 'nav',
  
  className: 'header navbar navbar-inverse navbar-fixed-top ',
  
  navChannel: Radio.channel('NavChannel'),

  collectionEvents: {
    'add': 'render'
  },
  
  initialize(options) {
  	options.container.show(this);
  	this.listenTo(Events, 'route', this.handleRoute );
  	this.listenTo(this.navChannel, 'header:item:add', this.addItem);
  	this.listenTo(this.navChannel, 'header:item:remove', this.removeItem);
  },

  handleRoute(name) {
  	console.log('handleRoute ');
  	this.nav.collapse('hide');
  },

  onRender() {
  	this.nav = this.$el.find('.collapse');
  },

  addItem(item) {
  	let model = new Model(item);
  	this.collection.add(item);
  },

  removeItem(item) {
  	let model = new Model(item);
  	this.collection.remove(item);
  },

  activate(item) {
  	this.collection.invoke('set', 'active', false);
  	let model = this.collection.findWhere(item);
    if (model) {
      model.set('active', true);
    }
  }

});
