import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import {Events} from 'backbone';
import {Model} from 'backbone';
import {Collection} from 'backbone';
import {Radio} from 'backbone';
import Session from '../../auth/session';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  
  tagName: 'nav',
  
  className: 'header navbar navbar-inverse navbar-fixed-top ',
  
  navChannel: Radio.channel('NavChannel'),

  collectionEvents: {
    'all': 'render'
  },
  
  /**
   * Marionette Method -
   * listen for routes and update based on access level
   * Listen for nav events to add/remove elements
   * @param  {Object} options
   * @return {null}
   */
  initialize(options) {
  	options.container.show(this);
  	this.listenTo(Events, 'route', this.handleRoute );
  	this.listenTo(this.navChannel, 'header:item:activate', this.activate);
  	this.listenTo(this.navChannel, 'header:item:add', this.addItem);
  	this.listenTo(this.navChannel, 'header:item:remove', this.removeItem);
  },

  /**
   * On each route Check access and remove items
   * @param  {String} Name of route
   */
  handleRoute(name) {
		let m = this.collection.filter(function(m){
			return m.level > Session.level();
		})
		this.collection.remove(m);
  },

  onRender() {
  	this.nav = this.$el.find('.collapse');
  },

  addItem(item) {
  	this.collection.add(new Model(item));
  },

  removeItem(item) {
  	this.collection.remove(new Model(item));
  },

  /**
   * Activate visual state of links when route changes
   * @param  {String} item The path of the route that was triggered
   * @return {null}
   */
  activate(item) {
  	let model = this.collection.where({path: 'login'})[0];
    if (model) {
      model.set('active', true);
    }
  }

});
