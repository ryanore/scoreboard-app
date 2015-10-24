// import BaseRoute from '../base/route';
import Marionette from 'backbone.marionette';
import View from './view';

let Route = Marionette.Object.extend({
	initialize(options){
		this.container = options.container;
		this.container.show(new View());
	}
});

export default Route;