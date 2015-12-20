/**
 * Sortable / Deletable Composite View
 * Requires a Sortable/BatchDelete Collection
 */
import {CompositeView} from 'backbone.marionette';
import BaseClass from '../../../base/views/collection-table-view';
import ItemView from './item-view';
import template from './collection-template.hbs';

export default BaseClass.extend({
	template: template,
	childView: ItemView,
	childViewContainer: '.tbody'
});
