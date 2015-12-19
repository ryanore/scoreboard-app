import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../../base/forms/form-behavior';
import template from './details-list.hbs';
import {history} from 'backbone';

export default ItemView.extend({
	tagName: 'form',
	template: template,
	className: 'users__create_form '
});
