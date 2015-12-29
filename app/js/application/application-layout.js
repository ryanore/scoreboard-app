import {LayoutView} from 'backbone.marionette';
import template from './application-layout.hbs';
import {Radio} from 'backbone';
import Header from './header/view';
import Footer from './footer/view';


export default LayoutView.extend({
	el: '#app-main',
	template: template,
	RootChannel: Radio.channel('RootChannel'),
	
	initialize() {
		this.listenTo(this.RootChannel,'header:show', this.handleHeader);
		this.listenTo(this.RootChannel,'footer:show', this.handleFooter);
		this.listenTo(this.RootChannel,'content:show', this.handleContent);
		this.render();
	},

	onRender: function(){
		this.header = new Header();
		this.footer = new Footer();
  },

	regions: {
		header: '.application__header',
		flashes: '.application__flashes',
		content: '.application__content',
		footer: '.application__footer',
		overlay: '.application__overlay'
	},

  handleContent(c) {
 		this.content.show(c);
  },

  handleHeader(c) {
 		this.header.show(c);
  },

  handleFooter(c) {
 		this.footer.show(c);
  }
});
