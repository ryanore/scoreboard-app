import {ItemView} from 'backbone.marionette';
import Session from '../../../entities/session';
import io from '../../../base/socket';
import template from './clock.hbs';

export default ItemView.extend({
	template: template,

  initialize() {
		io.on('joined_game', this.onInitGame.bind(this));
		io.on('time_updated', this.onClockUpdated.bind(this));
  },

	/**
	* Initialize score display with data from server
	*/
  onInitGame(data) {},

	/**
	 * Update on server triggers change in view
	 */
  onClockUpdated(data) {
  	this.render();
  }
});