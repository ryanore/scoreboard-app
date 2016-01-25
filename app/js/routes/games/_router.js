import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Router from 'base/router/router';
import Session from 'entities/session';
import IndexRoute from './index/_route';
import CreateRoute from './create/_route';
import GameRoute from './details/_route';

export default Router.extend({
	routes: {
		'games': 'index',
		'games/new': 'create',
		'games/mygames': 'mygames',
		'games/:id': 'details',
		'games/*notFound': 'notFound'
	},

	initialize(options = {}) {
		this.updateNav();
	},


	/**
	 * Update the main nav with The Games link 
	 * @return {null} 
	 */
	updateNav() {
		Radio.trigger('NavChannel', 'header:item:add',[{
			label: 'New Game',
			path: 'games/new',
			min: 0
		}, {
			label: 'Games',
			path: 'games'
		}]);
	},


	index() {
		return new IndexRoute();
	},

	mygames() {
		return new IndexRoute();
	},

	create() {
		return new CreateRoute();
	},

	details(id) {
		return new GameRoute(id);
	},

	notFound() {
		Backbone.history.navigate('notfound', {
			trigger: true
		});
	}

});
