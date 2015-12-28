import {ItemView} from 'backbone.marionette';
import template from './team-name.hbs';

export default ItemView.extend({
	template: template,
	className: 'games__create_team_empty',
	templateHelpers: {
		empty: true
	}
});
