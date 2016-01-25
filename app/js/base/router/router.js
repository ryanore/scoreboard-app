import {Router} from 'backbone';
import {Events} from 'backbone';
import {history} from 'backbone';
import Radio from 'backbone.radio';
import _ from 'lodash';
let originalRoute = Router.prototype.route;
let HistoryChannel = Radio.channel('HistoryChannel');
let nop = function() {};

let DopeRouter = Router.extend({
  beforeRoute: nop,

  afterRoute: nop,

  route(route, name, callback) {
    let cb = callback || this[name];
    let afterCallback;
    let beforeCallback;

    let wrappedCallback = _.bind(function() {
      let callbackArgs = [route, _.toArray(arguments)];

      if (_.isFunction(this.beforeRoute)) {
        beforeCallback = this.beforeRoute;
      } else if (typeof this.beforeRoute[route] !== 'undefined') {
        beforeCallback = this.beforeRoute[route];
      } else {
        beforeCallback = nop;
      }

      if (beforeCallback.apply(this, callbackArgs) === false) {
        return;
      }

      if (cb) {
        cb.apply(this, arguments);
      }

      if (_.isFunction(this.afterRoute)) {
        Events.trigger('route');
        Radio.trigger('HistoryChannel', 'history:add', history.fragment);
        afterCallback = this.afterRoute;
      } else if (typeof this.afterRoute[route] !== 'undefined') {
        afterCallback = this.afterRoute[route];
      } else {
        afterCallback = nop;
      }

      afterCallback.apply(this, callbackArgs);
    }, this);

    return originalRoute.call(this, route, name, wrappedCallback);
  }
});

export default DopeRouter;
