import Radio from 'backbone.radio';
import Router from '../base/router/router';
import IndexRoute from './index/route';
import CreateRoute from './create/route';
import DetailsRoute from './details/route';
import EditRoute from './edit/route';
import {history} from 'backbone';

export default Router.extend({
	initialize(options = {}) {
		this.container = options.container;
		this.updateNav();
	},

	routes: {
		'users': 'index',
		'users/details/': 'notFound',
		'users/details/:id': 'details',
		'users/edit': 'notFound',
		'users/edit/:id': 'edit',
		'users/new': 'create'
	},

	updateNav() {
		Radio.trigger('NavChannel','header:item:add', {
			label: 'Users',
			level: 1,
			path: 'users'
		});
	},

	index() {
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
		return new DetailsRoute({
			_id: id,
			container: this.container
		});
	},

	edit(id) {
		return new EditRoute({
			_id: id,
			container: this.container
		});
	},

	notFound() {
		history.navigate('notfound', {trigger:true});
	}

});
