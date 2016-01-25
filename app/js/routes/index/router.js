import Router from 'base/router/router';
import IndexRoute from './route';

export default Router.extend({
	routes: {
		'': 'index'
	},

  index() {
    return new IndexRoute();
  }
});
