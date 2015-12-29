import {ItemView} from 'backbone.marionette';
import template from './team-name.hbs';

export default ItemView.extend({
	template: template,
	className: 'games__create_team',
	initialize() {
		this.$input = this.$el.find('input');
	},
	events: {
		'click .btn-remove-team': 'removeSelf',
		'change input': 'updateSelf'
	},

	updateSelf() {
		this.model.set('name', this.$input.val());
	},

	removeSelf() {
		this.model.destroy();
	}
});
