import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import {Radio} from 'backbone';
import Session from '../../entities/session';
import template from './navItem.hbs';
import dropDownTemplate from './navItemDropdown.hbs';

export default ItemView.extend({
	tagName: 'li',
	initialize() {
  	this.listenTo(Backbone.Events, 'route', this.handleRoute );
	},

	display() {
		this.model.set('display', true);
		this.model.set('active' , this.model.get('path') === Backbone.history.fragment);
	},

	handleRoute() {
		let m = this.model;
		let min = typeof m.get('min') === 'undefined' ? -1000  : m.get('min');
		let max = typeof m.get('max') === 'undefined' ? 1000  : m.get('max');
		let level = Session.level();
		if( level >= min && level <= max){
			this.display();
		}
		else{
			this.model.set('display', false);
		}

		this.render();
	},

  getTemplate(){
    if (this.model.get("children")){
    	this.className = 'dropdown'
      return dropDownTemplate;
    } else {
      return template;
    }
  }
});
