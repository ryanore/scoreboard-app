import {ItemView} from 'backbone.marionette';
import socket from 'base/socket';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'home view container',
  initialize() {
  	// this.listenTo(socket, 'connect', this.onSocketConnect)
  	// console.log('connect... ');
  	// socket.on('connect', this.onSocketConnect);
  },
  onSocketConnect() {
  	// console.log('CONNECTED TO SOCKET ');
  }
});
