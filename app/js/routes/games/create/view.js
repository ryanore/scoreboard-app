import FormView from '../../../base/forms/form-view';
import validation from './validation';
import template from './template.hbs';
import TeamCollectionView from './teams-collection-view';

export default FormView.extend({
	template: template,
	className: 'view games__create',

	/**
	 * Post Render, add CollectionView
	 * @return {[type]} [description]
	 */
	onRender() {
 		this.addRegions({
 			'teams': '.game__add_team'
 		});
 		this.teams.show(this.teamsCollectionView);

	},

	/**
	 * Initialize main form view
	 * Add validation rules and create the collectionView for the teams which should handle itself
	 * @return {null}
	 */
	initialize() {
		this.model.validation = validation;
		this.teamsCollectionView = new TeamCollectionView();
	},

	beforeSave() {
		this.errors.push('PUSH');
		console.log('SAVE! ' );
	}

});
