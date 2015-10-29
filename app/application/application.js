import $ from 'jquery';
import Radio from 'backbone.radio';
import {Collection} from 'backbone';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';
import Header from './header/view';
import Footer from './footer/view';
// import './styles.scss';

let routerChannel = Radio.channel('router');

export default Application.extend({
	initialize() {
		$('body').append('<div id="app-main"></div>');
		
		this.layout = new LayoutView();
		
		this.layout.render();
		
		this.header = new Header({
			collection: new Collection(),
			container: this.layout.header
		});

		this.footer = new Footer({
			collection: new Collection(),
			container: this.layout.footer
		});

		this.listenTo(routerChannel, {
			'before:enter:route': this.onBeforeEnterRoute,
			'enter:route': this.onEnterRoute
    });
	},
	onBeforeEnterRoute() {},
	onAfter() {}
});

