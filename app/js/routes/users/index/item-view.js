import BaseClass from '../../../base/views/collection-table-itemview';
import {history} from 'backbone';
import {formatDate} from '../../../utils/date';
import template from './item-template.hbs';

export default BaseClass.extend({
  tagName: 'tr',
  template: template,
  className: 'users__item',
  
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
			level: this.model.get('access') > 0 ? 'admin': 'user'
		};
	}
});
