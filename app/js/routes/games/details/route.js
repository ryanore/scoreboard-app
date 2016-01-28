import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import Session from '../../../entities/session';
import Game from '../../../entities/models/game';
import View from './layout-view';
let Route = Marionette.Object.extend({

  RootChannel: Radio.channel('RootChannel'),

  /**
   * Initialze Route
   * Build model/view and send it up to the content region
   * If there is no id passed in, default to the current user
   * @return  {null}
   */
  initialize(id) {
    this._id = id;

    this.fetch().then((m) => {
      Radio.trigger('RootChannel', 'content:show', new View({
        model: m
      }));
    });
  },


  /**
   * Fetch Model
   * @return {Promise}
   */
  fetch() {
    let defer = $.Deferred();
    let m = new Game({
      _id: this._id
    });
    m.fetch({
      success: function() {
        defer.resolve(m);
      },
      error: function() {
        return Backbone.history.navigate('notfound', {
          trigger: true
        });
      }
    });
    return defer;
  }
});

export default Route;
