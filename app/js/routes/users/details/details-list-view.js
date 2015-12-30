import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../../base/forms/form-behavior';
import template from './details-list.hbs';
import {history} from 'backbone';
import {formatDate} from '../../../utils/date';

export default ItemView.extend({
	tagName: 'form',
	template: template,
	className: 'users__details_table ',
	templateHelpers() {
		var first = this.model.get('firstName') || '(?)';
		var last = this.model.get('lastName') || '(?)';
		return{
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			firstName: first,
			lastName: last
		}
	}
});
