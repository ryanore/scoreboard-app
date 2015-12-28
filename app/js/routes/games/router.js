import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Router from '../../base/router/router';
import Session from '../../entities/session';
import IndexRoute from './index/route';
import CreateRoute from './create/route';

export default Router.extend({
	routes: {
		'games': 'index',
		'games/new': 'create',
		'games/mygames': 'mygames',
		'games/:id': 'details',
		'games/*notFound': 'notFound'
	},

	initialize(options = {}) {
		this.container = options.container;
		this.updateNav();
	},


	/**
	 * Update the main nav with The Games link 
	 * Only if the user is admin
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

	/**
	 * Routes
	 */

	index() {
		return new IndexRoute({
			container: this.container
		});
	},

	mygames() {
		return new IndexRoute({
			container: this.container
		});
	},

	create() {
		return new CreateRoute({
			container: this.container
		});
	},


	details(id) {
		return new IndexRoute({
			container: this.container
		});
	},

	notFound() {
		Backbone.history.navigate('notfound', {
			trigger: true
		});
	}

});
