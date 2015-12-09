import {history, Events} from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import _ from 'lodash';

let HistoryChannel = Radio.channel('HistoryChannel');

let BBHistory = Marionette.Object.extend({

	initialize() {
  // 	this.listenTo(HistoryChannel, 'history:add', this.addHistory);

  // 	// This...
		// history.on('route', function(router, name, args) {
	 //  	console.log('router ', router);
	 //  	console.log('name ', name);
	 //  	console.log('args ', args);
		// });
	},

	addHistory(frag) {
		// console.log('frag ', frag);
	}

});

export default new BBHistory();
	