import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import Collection from 'entities/collections/games';
import Session from 'entities/session';
import View from './layout-view';
let Route = Marionette.Object.extend({

  RootChannel: Radio.channel('RootChannel'),

  /**
   * Initialze Route - Build model/view and send it up to the content region
   * Self Destruct
   * @return  {null}
   */
  initialize() {
    this.fetch().then((c) => {
      Radio.trigger('RootChannel', 'content:show', new View({
        collection: c
      }));
      this.destroy();
    });
  },

  /**
   * Fetch Model
   * @return {Promise}
   */
  fetch() {
    let defer = $.Deferred();
    let c = new Collection();
    c.fetch({
      success: function() {
        defer.resolve(c);
      }
    });
    return defer;
  }

});


export default Route;
