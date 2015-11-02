import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './collection-view';
import {Collection} from '../../base/collection';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'users users--index container',

  regions: {
    list: '.users__list'
  },
	
	events: {
  	'click .btn-new-user': 'newUser',
  	'click .btn-delete': 'deleteUsers'
  },
  
  newUser() {
  	history.navigate('users/new', {trigger: true});
  },

  deleteUsers() {
  	this.collectionView.deleteUsers();
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.collection
    });
    this.list.show(this.collectionView);
  }

});
