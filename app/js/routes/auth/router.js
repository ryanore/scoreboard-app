import Radio from 'backbone.radio';
import Router from '../../base/router/router';
import Session from '../../entities/session';
import LoginRoute from './login/route';
import ForgotRoute from './forgot/route';
import {history} from 'backbone';

export default Router.extend({
	initialize(options = {}) {
		this.container = options.container;
		this.updateNav();
	},

	routes: {
		'login': 'logIn',
		'logout': 'logOut',
		'forgotpassword': 'forgotpassword'
	},

	/**
	 * Update the main nav with links
	 * @return {null} 
	 */
	updateNav() {
		Radio.trigger('NavChannel','header:item:add', [
			{ label: 'Login', 	path: 'login', 		 max: -1 }
		]);		
	},

	logIn() {
		return new LoginRoute({
			container: this.container
		});
	},

	logOut() {
		Session.logOutUser();
		history.navigate('', {trigger: true});
	},

	forgotpassword() {
		return new ForgotRoute({
			container: this.container
		});
	}
});
