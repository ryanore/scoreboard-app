import Syphon from 'backbone.syphon';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../../base/forms/form-behavior';
import {history} from 'backbone';
import {formatDate} from '../../../utils/date';
import template from './details-list.hbs';
export default ItemView.extend({
	template: template,
	className: 'users__details_list ',
	templateHelpers() {
		var first = this.model.get('firstName') || '(?)';
		var last = this.model.get('lastName') || '(?)';
		return{
			createdAt: formatDate(this.model.get('createdAt'), 'short'),
			firstName: first,
			lastName: last
		}
	},
	initialize() {

	},
	onRender() {
		this.$el.find('input').prop('disabled', true);
		return Syphon.deserialize(this, this.model.attributes);
	}
});
