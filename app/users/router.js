import Router from '../base/router';
import Backbone from 'backbone';
export default Router.extend({
	routes: {
		users: 'index',
		'users/new': 'index'
	},
	beforeRoute() {
		Backbone.history.navigate('', {trigger: true});
	},
	afterRoute() {

	},
	index() {
		console.log('---- ', 'USERS');
	}
});
