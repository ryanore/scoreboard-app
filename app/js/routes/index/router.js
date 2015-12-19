import Router from '../../base/router/router';
import IndexRoute from './route';

export default Router.extend({
	initialize(options = {}) {
		this.container = options.container;
	},

	routes: {
		'': 'index'
	},

  index() {
    return new IndexRoute({
      container: this.container
     });
  }
});
