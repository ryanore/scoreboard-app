import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import {Radio} from 'backbone';
import Session from '../../entities/session';
import template from './navItem.hbs';
import dropDownTemplate from './navItemDropdown.hbs';
export default ItemView.extend({
  tagName: 'li',

  initialize() {
    this.listenTo(Backbone.Events, 'route', this.handleRoute);
  },

  /**
   * Update nav on each route
   * Each nav item performs logic on how/if to display
   * @return {null}
   */
  handleRoute() {
    let m = this.model;
    let min = typeof m.get('min') === 'undefined' ? -1000 : m.get('min');
    let max = typeof m.get('max') === 'undefined' ? 1000 : m.get('max');
    let level = Session.level();
    // display
    if (level >= min && level <= max) {
      this.model.set('display', true);
      this.model.set('active', this.model.get('path') === Backbone.history.fragment);
    }
    // don't display
    else {
      this.model.set('display', false);
    }
    this.render();
  },


  /**
   * Get Proper Template depending on whether it's a dropdown or not.
   * Marionette override
   * @return {null}
   */
  getTemplate() {
    if (this.model.get("children")) {
      this.className = 'dropdown'
      return dropDownTemplate;
    } else {
      return template;
    }
  }
});
