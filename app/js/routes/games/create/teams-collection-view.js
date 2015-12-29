import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import {Collection} from 'backbone';
import Team from './teamModel';
import EmptyView from './team-name-empty-view';
import TeamName from './team-name-view';
import template from './teams-collection.hbs';

export default CompositeView.extend({
	template: template,
	className: 'games__create_teams_list',
	childView: TeamName,
	emptyView: EmptyView,
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

	validate() {
		let rmv = this.collection.where({name:''});
		this.collection.remove(rmv);
	},

	initialize() {
		this.collection = new Collection(),
		this.addTeamInput();
	}
});
