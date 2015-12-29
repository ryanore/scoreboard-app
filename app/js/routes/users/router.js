import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Router from '../../base/router/router';
import Session from '../../entities/session';
import IndexRoute from './index/route';
import CreateRoute from './create/route';
import DetailsRoute from './details/route';

export default Router.extend({
	routes: {
		'signup': 'create',
		'users': 'index',
		'users/details/me': 'details',
		'users/details/:id': 'details',
		'users/edit/:id': 'edit',
		'users/*notFound': 'notFound'
	},

	initialize(options = {}) {
		this.updateNav();
	},

	/**
	 * Update the main nav with The Users link 
	 * Only if the user is admin
	 * @return {null} 
	 */
	updateNav() {
		Radio.trigger('NavChannel', 'header:item:add', [{
			label: 'Sign Up',
			path: 'signup',
			max: -1
		}, {
			label: 'Users',
			path: 'users',
			min: 1
		}, {
			className: 'user',
			min: 0,
			path: 'users',
			children: [{
					label: 'Logout',
					path: 'logout'
				}, {
					label: 'Your Details',
					path: 'users/details/me'
			}]
		}]);
	},


	/**
	 * New User Route
	 */
	create() {
		return new CreateRoute();
	},

	/**
	 * List Users Route
	 */
	index() {
		return new IndexRoute();
	},

	/**
	 * User Details Route
	 */
	details(id) {
		if(!id){
			if(Session.user){
				id = Session.user._id;
			} else {
				id = null;
			}
		}
		return new DetailsRoute({ _id: id });
	},

	/**
	 * Not Found Route
	 */
	notFound() {
		Backbone.history.navigate('notfound', {
			trigger: true
		});
	}

});
