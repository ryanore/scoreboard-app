import {history, Events} from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import _ from 'lodash';
let HistoryChannel = Radio.channel('HistoryChannel');

let BBHistory = Marionette.Object.extend({

  initialize() {},

  addHistory(frag) {
    // console.log('frag ', frag);
  }
});

export default new BBHistory();
