import Radio from 'backbone.radio';
import Router from '../base/router/router';
import Session from './session';
import LoginRoute from './login/route';
import {history} from 'backbone';

export default Router.extend({
	initialize(options = {}) {
		this.container = options.container;
		this.updateNav();
	},

	routes: {
		'login': 'login'
	},

	/**
	 * Update the main nav with links
	 * @return {null} 
	 */
	updateNav() {
		if(!Session.level(0)){
			Radio.trigger('NavChannel','header:item:add', {
				label: 'Login',
				path: 'login'
			});
			Radio.trigger('NavChannel','header:item:add', {
				label: 'Sign Up',
				path: 'users/new'
			});
		}
	},

	login() {
		console.log('LOGIN ');
		return new LoginRoute({
			container: this.container
		});
	}

});
