import {LayoutView} from 'backbone.marionette';
import CollectionView from './collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'users users--index container',

  regions: {
    list: '.users__list'
  },

  initialize(options = {}) {},

  onBeforeRender() {},

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.collection
    });
    this.list.show(this.collectionView);
  }

});
