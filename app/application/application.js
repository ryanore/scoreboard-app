import $ from 'jquery';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';

let routerChannel = Radio.channel('router');

export default Application.extend({
	initialize() {
		$('body').append('<div id="app-main"></div>');
		this.layout = new LayoutView();
		this.layout.render();
		this.listenTo(routerChannel, {
			'before:enter:route': this.onBeforeEnterRoute,
			'enter:route': this.onEnterRoute
    });
	},
	onBeforeEnterRoute() {},
	onAfter() {}
});

