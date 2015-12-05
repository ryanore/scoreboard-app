import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
	el: '#app-main',
	template: template,
	initialize() {},
	regions: {
		header: '.application__header',
		flashes: '.application__flashes',
		content: '.application__content',
		footer: '.application__footer',
		overlay: '.application__overlay'
	}
});
