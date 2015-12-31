import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Session from '../../../entities/session';
import template from './layout-template.hbs';

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
  	'click .btn-plus': 'scoreUp',
  	'click .btn-minus': 'scoreDown'
  },

  scoreUp() {
  	console.log('up ');
  },

  scoreDown() {
  	console.log('down ');
  },

  initialize() {

  },
 
	templateHelpers() {
		let isUser = Session.isUser(this.model.get('owner'));
		return {
			allowEdit: isUser || Session.level(1),
			allowDelete: isUser || Session.level(1)
		};
	},
 
	onRender() {
		console.log('rendere ', this.model.attributes);
  }
});
