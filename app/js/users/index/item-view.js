import {ItemView} from 'backbone.marionette';
import {history} from 'backbone';
import {formatDate} from '../../utils/date';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'tr',
  template: template,
  className: 'users__item',
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
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			level: this.model.get('access') > 0 ? 'admin': 'user'
		};
	}
});
