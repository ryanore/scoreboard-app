import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';
import {history} from 'backbone';
export default ItemView.extend({
  tagName: 'div',
  template: template,
  className: ' tablerow users__item list-group-item',
  modelEvents: {},
  onRender() {},
  events:{
  	'click': 'handleClickRow',
  	'change [type="checkbox"]': 'handleSelectRow'
  },
  
  /**
   * Click Row navigates to the details 
   * Do nothing if click was on the checkbox.
   * @param  {Event} e Click Event
   * @return {null}
   */
  handleClickRow(e) {
  	if(!e.target.classList.contains('noclick')){
  		history.navigate(`#users/details/${this.model.get('_id')}`, {trigger: true});
  	}
  },

  /**
   * Checkbox selected 
   * Toggle model as markedForDelete
   * @return {null}
   */
  handleSelectRow(e) {
  	this.model.set('markedForDelete', e.target.checked);
  },

  /**
   * Data for the template, Marionette helper
   * @return {Object}
   */
	templateHelpers() {
		return {
			level: this.model.get('access') > 0 ? 'admin': 'user'
		};
	}
});
