import {ItemView} from 'backbone.marionette';
import template from './team-name.hbs';

export default ItemView.extend({
	template: template,
	className: 'games__create_team',
	events: {
		'click .remove': 'removeSelf'
	},
	initialize() {
		console.log('model ', this.model.attributes);
	},
	removeSelf() {
		console.log('REMOVE ME!');
	}
});
