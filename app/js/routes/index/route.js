import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import View from './view';

let Route = Marionette.Object.extend({
  RootChannel: Radio.channel('RootChannel'),
	
	initialize(options){
  	Radio.trigger('RootChannel','content:show', new View());
	}

});

export default Route;