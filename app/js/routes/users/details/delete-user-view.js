import {ItemView} from 'backbone.marionette';
import template from './delete-user.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'div',
	template: template,
	className: 'users__delete_confirm ',

	events: {
		'submit': 'onFormSubmit'
	},

	close() {
		alert('close');
	},

	onFormSubmit() {
		alert('you have been deleted');
	}
});
