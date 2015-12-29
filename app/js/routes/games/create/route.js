import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';
import View from './view';
import Game from '../../../entities/models/game';
import Session from '../../../entities/session';
import validation from './validation';

let Route = Marionette.Object.extend({
  RootChannel: Radio.channel('RootChannel'),
	
	/**
	 * Initialze Route
	 * Build model/view and send it up to the content region
	 * Use Backbone.Validation and importa validation config from file
	 * @return  {null}
	 */
	initialize(options) {
		if (!this.validate()) {
			return Backbone.history.navigate('/', {
				trigger: true
			});
		}

  	Radio.trigger('RootChannel','content:show', new View({
			model: new Game()
		}));
	},


	/**
	 * Validate User's Permissions
	 * @return {boolean} Must be admin, or not logged in
	 */
	validate() {
		return (Session.level(1));
	}

});

export default Route;
