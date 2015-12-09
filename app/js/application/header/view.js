import _ from 'lodash';
import Backbone from 'backbone';
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
  navCollection: new Backbone.Collection(),
  tagName: 'nav',
  className: 'header navbar navbar-inverse navbar-fixed-top ',
  NavChannel: Radio.channel('NavChannel'),

  collectionEvents: {
    'all': 'render'
  },
  
  /**
   * listen for routes and update based on access level
   * Listen for nav events to add/remove elements
   * @param  {Object} options
   * @return {null}
   */
  initialize(options) {
  	options.container.show(this);
  	this.listenTo(Events, 'route', this.handleRoute );
  	this.listenTo(this.NavChannel, 'header:item:activate', this.activate);
  	this.listenTo(this.NavChannel, 'header:item:add', this.addItems);
  },

  /**
   * Marionette callback after render - close menu after each render
   * @return {null}
   */
  onRender() {
  	this.nav = this.$el.find('.collapse');
  },


  /**
   * On each route Check access and remove items
   * @param  {String} Name of route
   */


// The only time they will change is on init, login and logout
// Maybe there needs to be a pre init function on the app wehere sub sections register themselves (including nav)



  handleRoute() {
		let m = this.navCollection.filter(function(m){
			let min = typeof m.get('min') === 'undefined' ? -1000  : m.get('min');
			let max = typeof m.get('max') === 'undefined' ? 1000  : m.get('max');
			let level = Session.level();
			return (level >= min) && (level <= max); 
		})
		this.collection.reset(m);
  },

  /**
   * Add items to menu, single object or array
   * Triggered by NavChannel Event
   * @param {null} items object or array
   */
  addItems(items) {
		items.forEach(item => {
			this.navCollection.push(item);	
		});
  },


  /**
   * Activate visual state of links when route changes
   * @param  {String} item The path of the route that was triggered
   * @return {null}
   */
  activate(item) {
  	let model = this.navCollection.where({path: item})[0];
  	this.collection.invoke('set', {active: false});
    if (model) {
      model.set('active', true);
    }
  }

});
