import Backbone from 'backbone';
import {CollectionView} from 'backbone.marionette';
import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Session from '../../../entities/session';
import template from './layout-template.hbs';
import io from '../../../base/socket';
import ClockView from './clock-view';
import ScoreView from './score-view';
let	UserChannel = Radio.channel('UserChannel');

export default LayoutView.extend({
  template: template,

  regions: {
  	clock: '.game-clock',
  	scores: '.game-score'
  },

  className(){
  	return `games__detail view container-fluid teams-${this.model.get('teams').length}`; 
  },

  onBeforeShow() {
  	let teams = new Backbone.Collection(this.model.get('teams'));
  	
  	this.clock.show(new ClockView());

  	this.scores.show(new CollectionView({
  		collection: teams,
  		childView: ScoreView
  	}));

  	io.emit('join_game', this.model.get('_id') );
  },

  /**
   * Leave Socket when navigate away, keep server clean.
   */
  onBeforeDestroy() {
  	io.emit('leave_game' );
  }

});
