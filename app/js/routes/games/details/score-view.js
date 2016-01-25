import {ItemView} from 'backbone.marionette';
import Session from 'entities/session';
import io from 'base/socket';
import template from './score.hbs';

export default ItemView.extend({
	template: template,
  
  events: {
  	'click .btn-plus,.btn-minus': 'onClickScore',
  },

  /**
   * Initialize - set listeners on socket which need to be removed before destroy
   */
  initialize() {
  	this.score = {};
  	this.teamName = this.model.get('name');
		io.on('joined_game', this.onInitGame.bind(this));
		io.on('score_updated', this.onScoreUpdated.bind(this));		
  },

  /**
   * Web Socket Connection Complete - now registered with App
   */
  onInitGame(data) {
  	this.game_id = data._id;
  	this.onScoreUpdated(data.score);
  },

  /**
   * Critical Cleanup
   */
  onBeforeDestroy() {
  	io.off();
  },

  /**
   * Click handler - up or down.
   */
  onClickScore(e) {
		let dir = e.currentTarget.getAttribute('data-dir');
	 	this.score[this.teamName] += (dir==='up') ? 1 : -1;
		io.emit('update_score', {
			id: this.game_id, 
			score: this.score
		});
  },

  /**
   * Score from server
   */
  onScoreUpdated(data) {
  	this.score = data;
  	this.render();
  },

  /**
   * Data for template
   */
	templateHelpers() {
		let isUser = Session.isUser(this.model.get('owner'));
		let	score = this.score[this.teamName] || '0';
		return {
			allowEdit: isUser || Session.level(1),
			score: score
		};
	}
});