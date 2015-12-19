import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'users view games--index container'
});
