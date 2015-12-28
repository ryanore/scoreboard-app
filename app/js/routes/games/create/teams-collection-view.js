import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import {Collection} from 'backbone';
import Team from './teamModel';
import TeamName from './team-name-view';
import template from './teams-collection.hbs';

export default CompositeView.extend({
	template: template,
	className: 'games__create_teams_list',
	collection: new Collection(),
	childView: TeamName,
  childViewContainer: ".teams-list",

  events: {
  	'click .btn-add-team': 'addTeamInput'
  },

	addTeamInput() {
		this.collection.add( new Team() );
	},

	getTeams() {
		return this.collection.toJSON();
	},

	initialize() {
		this.addTeamInput();
	}
});
