import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Router from '../base/router/router';
import Session from '../entities/session';
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
		this.container = options.container;
		this.updateNav();
	},

	/**
	 * Update the main nav with The Users link 
	 * Only if the user is admin
	 * @return {null} 
	 */
	updateNav() {
		Radio.trigger('NavChannel', 'header:item:add', [{
			label: 'Users',
			path: 'users',
			min: 1
		}, {
			label: 'Sign Up',
			path: 'signup',
			max: -1
		}, {
			className: 'user',
			min: 0,
			children: [{
					label: 'Logout',
					path: 'logout'
				}, {
					label: 'Your Details',
					path: 'users/details/me'
			}]
		}]);
	},

	create() {
		Radio.trigger('NavChannel', 'header:item:activate', 'signup');
		return new CreateRoute({
			container: this.container
		});
	},

	index() {
		Radio.trigger('NavChannel', 'header:item:activate', 'users');
		return new IndexRoute({
			container: this.container
		});
	},

	details(id) {
		if(!id){
			if(Session.user){
				id = Session.user._id;
			} else {
				id = null;
			}
		}
		Radio.trigger('NavChannel', 'header:item:activate', 'user');
		return new DetailsRoute({
			_id: id,
			container: this.container
		});
	},

	notFound() {
		Backbone.history.navigate('notfound', {
			trigger: true
		});
	}

});
