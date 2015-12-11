import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
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
   * listen for routes and nav events, update based on access level
   * @param  {Object} options
   * @return {null}
   */
  initialize(options) {
  	options.container.show(this);
  	this.listenTo(Backbone.Events, 'route', this.handleRoute );
  	this.listenTo(this.NavChannel, 'header:item:activate', this.activate);
  	this.listenTo(this.NavChannel, 'header:item:add', this.addItems);
  },

  /**
   * On each route Check access and remove items
   * @param  {String} Name of route
   */
  handleRoute() {
		let m = this.navCollection.filter(function(m){
			let min = typeof m.get('min') === 'undefined' ? -1000  : m.get('min');
			let max = typeof m.get('max') === 'undefined' ? 1000  : m.get('max');
			let level = Session.level();
			return (level >= min) && (level <= max); 
		})
		this.collection.reset(m);
  	this.nav = this.$el.find('.collapse');
  },


  /**
   * When Application starts,
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
