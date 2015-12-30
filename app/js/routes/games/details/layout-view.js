import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Session from '../../../entities/session';
import template from './layout-template.hbs';

let	UserChannel = Radio.channel('UserChannel');


export default LayoutView.extend({
  template: template,
  className: 'games__detail view container-fluid',

 	regions: {

 	},

  events: {

  },


  /**
   * Init Class - Marionette method
   * @return {null}
   */
  initialize() {

  },


	/**
	 * Add Variables to template - Marionette method.
	 * @return {Object}
	 */
	templateHelpers() {
		let isUser = Session.isUser(this.model.get('owner'));
		return {
			allowEdit: isUser || Session.level(1),
			allowDelete: isUser || Session.level(1)
		};
	},
 

 	/**
 	 * Render callback - Marionette method
 	 * @return {null}
 	 */
	onRender() {
		console.log('rendere ', this.model);
  }


});
