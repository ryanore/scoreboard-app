import {history} from 'backbone';
import Session from 'entities/session';
import BaseClass from 'base/views/collection-table-itemview';
import {formatDate} from 'utils/date';
import template from './item-template.hbs';

export default BaseClass.extend({
  tagName: 'div',
  template: template,
  className: 'tr users__item',
  
  /**
   * Overwrites abstract base method
   */
  rowClicked() {
  	history.navigate(`#users/details/${this.model.get('_id')}`, {trigger: true});
  },
  
  
  /**
   * Data for the template, Marionette helper
   * @return {Object}
   */
	templateHelpers() {
		return {
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			admin: Session.level(1)
		};
	}
});
