import $ from 'jquery';
import socket from 'base/socket';
import {Collection} from 'backbone';
import {Application} from 'backbone.marionette';
import LayoutView from './application-layout';
import Session from '../entities/session';
export default Application.extend({

  /**
   * Initialize Application
   * @return {Marionette.Application}
   */
  initialize() {
    this.buildDom();

    this.addHeaders();

    this.startApplication();
  },


  /**
   * Validate User's Token, and start the app
   * Use short setTimeout to get around weird async shit.
   */
  startApplication() {
    Session.validateToken().then(() => {
      setTimeout(() => {
        this.start();
      }, 1);
    });
  },


  /**
   * Build the HTML Structure and all the main sections
   * @return {[type]} [description]
   */
  buildDom() {
    $('body').append('<div id="app-main"></div>');
    this.layout = new LayoutView();
  },


  /**
   *  Hijacky Sync function to add auth headers
   *  jwt token expects Authorization: Bearer
   */
  addHeaders() {
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + Session.getAccessToken());
        return xhr;
      }
    });

    var backboneSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
      options.headers = {
        'Authorization': 'Bearer ' + Session.getAccessToken()
      };
      backboneSync(method, model, options);
      return model;
    };
  }
});
