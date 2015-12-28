import {ItemView} from 'backbone.marionette';
import template from './team-name.hbs';

export default ItemView.extend({
	template: template,
	className: 'games__create_team',
	events: {
		'click .btn-remove-team': 'removeSelf'
	},
	removeSelf() {
		console.log('this.mdoel ', this.model);
		this.model.destroy();
		console.log('this.mdoel ', this.model);
	}
});
