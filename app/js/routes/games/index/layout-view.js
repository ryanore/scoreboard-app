import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './collection-view';
import {Collection} from 'base/collections/collection';
import template from './layout-template.hbs';
export default LayoutView.extend({
  template: template,
  className: 'games view games--index container-fluid',

  regions: {
    list: '.users__list'
  },

  events: {
    'click .btn-delete': 'deleteGames'
  },

  newUser() {
    history.navigate('signup', {
      trigger: true
    });
  },

  deleteGames() {
    this.collectionView.triggerDelete();
  },

  handleSelectRow() {
    let selected = this.collection.where({
      markedForDelete: true
    });
    this.btnDelete.prop('disabled', selected.length === 0);
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.collection,
      sort: 'createdAt'
    });
    this.list.show(this.collectionView);
    this.listenTo(this.collection, 'change:markedForDelete', this.handleSelectRow);
    this.btnDelete = this.$('.btn-delete').prop('disabled', true);
  }

});
