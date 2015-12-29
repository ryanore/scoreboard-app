import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {Radio} from 'backbone';
import Session from '../../entities/session';
import template from './template.hbs';
import navItem from './navItem';

export default CompositeView.extend({
  template: template,
  tagName: 'nav',
  childView: navItem,
  childViewContainer: '.navbar-nav',
  className: 'header navbar navbar-inverse navbar-fixed-top ',
  NavChannel: Radio.channel('NavChannel'),
  RootChannel: Radio.channel('RootChannel'),

  initialize(options) {
  	this.collection = new Backbone.Collection();
  	this.listenTo(this.NavChannel, 'header:item:add', this.addItems);
  	Radio.trigger('RootChannel','header:show', this);	
  },

  addItems(items) {
		items.forEach(item => {
			this.collection.push(item);	
		});
  }

});
