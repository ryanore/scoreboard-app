import {ItemView} from 'backbone.marionette';
import Session from 'entities/session';
import io from 'base/socket';
import template from './clock.hbs';
export default ItemView.extend({
  template: template,
  className: 'clock',
  events: {
    'click .btn-playPause': 'onClickToggle',
    'click .btn-reset': 'onClickReset'
  },


  ////////////  MARIONETTE METHODS  ////////////


  initialize() {
    this.running = false;
    io.on('joined_game', this.onInitGame.bind(this));
    io.on('tic', this.onClockUpdated.bind(this));
    io.on('state', this.onStateChange.bind(this));
  },

  onAttach() {
    this.$display = this.$el.find('.digits');
  },

  templateHelpers() {
    let isUser = Session.isUser(this.model.get('owner'));
    return {
      allowEdit: isUser || Session.level(1)
    };
  },



  ////////////  SOCKET EVENTS  ////////////


  onInitGame(data) {
    this.onClockUpdated(data.time);
  },

  onStateChange(state) {
    this.$el.attr('data-state', state);
    this.running = state === 'playing';
  },

  onClockUpdated(data) {
    let parsed = this.parseTime(data);
    console.log('parsed ', parsed);
    this.$display.html(parsed);
  },



  ////////////  UI EVENTS  ////////////


  onClickToggle(e) {
    if (this.running) {
      io.emit('clock_stop');
    } else {
      io.emit('clock_start');
    }
  },


  onClickReset() {
    io.emit('clock_reset');
  },



  ////////////  UTILITY METHODS   ////////////


  parseTime(seconds) {
    let ms = parseInt((seconds % 1000) / 100);
    let sec = parseInt((seconds / 1000) % 60);
    let min = parseInt((seconds / (1000 * 60)) % 60);
    let hours = parseInt((seconds / (1000 * 60 * 60)) % 24);

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return min + ':' + sec;
  }
});
