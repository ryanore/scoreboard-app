require('./js/base/plugins');
import './main.scss';
import Backbone from 'backbone';
import AuthRouter from './js/routes/auth/router';
import IndexRouter from './js/routes/index/router';
import UsersRouter from './js/routes/users/router';
import ErrorRouter from './js/routes/error/router';
import Application from './js/application/application';

let app = new Application().on('start', function(){
	new IndexRouter({
		container: app.layout.content
	});

	new UsersRouter({
		container: app.layout.content
	});

	new AuthRouter({
		container: app.layout.content
	});

	new ErrorRouter({
		container: app.layout.content
	});
	
	Backbone.history.start();

});
