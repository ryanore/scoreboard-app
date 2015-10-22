import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';

let routerChannel = Radio.channel('router');

export default Application.extend({
  initialize() {
  	console.log('Application ','tst');
	}
});

