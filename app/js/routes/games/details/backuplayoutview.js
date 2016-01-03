import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Session from '../../../entities/session';
import template from './layout-template.hbs';
import io from '../../../base/socket';
let	UserChannel = Radio.channel('UserChannel');

export default LayoutView.extend({
  template: template,
  className(){
  	return `games__detail view container-fluid teams-${this.model.get('teams').length}`; 
  },

 	regions: {
 		clock: '.game-clock',
 		score: '.game-score'
 	},

  events: {
  	'click .btn-plus': 'onClickScoreUp',
  	'click .btn-minus': 'onClickScoreDown'
  },

  /**
   * TODO:  have scoreboards be their own views with model and update selves
   */
  initialize() {
		io.emit('join_game', this.model.toJSON() );
		io.on('joined_game', this.onJoinedGame );
		io.on('score_updated', this.onScoreUpdated.bind(this));
		this.listenTo(this.model, 'change:score', this.render);
  },


  /**
   * Score back from Websocket
   * Render and update model.
   */
  onScoreUpdated(newScore) {
  	this.model.set('score', newScore);
  },
 	

  /**
   * Click Score Up
   * @return {[type]} [description]
   */
  onClickScoreUp() {
  	let score = _.clone(this.model.attributes.score);
  	score.Jedi ++;
		io.emit('update_score', {
			game_id: this.model.attributes._id, 
			score: score
		});
  },

  /**
   * Click Score Down
   * @return {[type]} [description]
   */
  onClickScoreDown() { },

  onJoinedGame() {},

	templateHelpers() {
		let isUser = Session.isUser(this.model.get('owner'));
		return {
			allowEdit: isUser || Session.level(1),
			allowDelete: isUser || Session.level(1)
		};
	}
});
