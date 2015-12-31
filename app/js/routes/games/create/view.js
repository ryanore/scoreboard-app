import FormView from '../../../base/forms/form-view';
import Backbone from 'backbone';
import validation from './_validation';
import template from './template.hbs';
import TeamCollectionView from './teams-collection-view';

export default FormView.extend({
	template: template,
	
	className: 'view games__create',

	/**
	 * Initialize view with it's validation rules, and inclusion 
	 * inclusion is kind of edge case for syphon.
	 * @return {[type]} [description]
	 */
	initialize() {
		this.model.validation = validation;
		this.teamsCollection = new Backbone.Collection();
	},


	/**
	 * After Rendering, 
	 * Set region for CollectionView, then show it.
	 * @return {null}
	 */
	onRender() {
 		this.addRegions({
 			'teams': '.game__add_team'
 		});
		this.teamsCollectionView = new TeamCollectionView({collection: this.teamsCollection});
 		this.teams.show(this.teamsCollectionView);
	},


	/**
	 * Validate the collection of teams.
	 * If valid, set up the score property with team names and 0 value.
	 * @return {null}
	 */
	beforeSave() {
		if( !this.teamsCollectionView.validate() ){
			this.model.errors.push('Please add at least 2 teams.');
		} else {
			let teams = this.teamsCollection.toJSON();
			let score = {};
			_.each(teams, (t) => {
				score[t.name] = 0;
			});
			this.model.set('score', score);
			this.model.set('teams', teams);
		}
	},


	/**
	 * Redirect to newly created resource
	 * @param  {Object} m Backbone.Model
	 * @return {null}
	 */
	onSuccess(m) {
		Backbone.history.navigate('/games/'+m.get('_id'), {trigger: true});
	}
});
