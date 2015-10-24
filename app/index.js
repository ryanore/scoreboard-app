import Backbone from 'backbone';
import IndexRouter from './index/router';
import UsersRouter from './users/router';
import Application from './application/application';

let app = new Application();

app.index = new IndexRouter({
	container: app.layout.content
});

app.users = new UsersRouter({
	container: app.layout.content
});

Backbone.history.start();
