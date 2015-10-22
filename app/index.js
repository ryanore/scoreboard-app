import Backbone from 'backbone';
import $ from 'jquery';
import IndexRouter from './index/router';
import UsersRouter from './users/router';
import {Application} from 'backbone.marionette';

$('body').append('<div id="app-main"></div>');

let app = new Application();

app.index = new IndexRouter();

app.users = new UsersRouter();

Backbone.history.start();
