import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default ItemView.extend({
  template: template,
	className: 'games view games--index container'
});
