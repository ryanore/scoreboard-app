import {CollectionView} from 'backbone.marionette';
import ItemView from './item-view';

export default CollectionView.extend({
  className: 'list-group table ',
  childView: ItemView,
  
  deleteUsers() {
  	let models = this.collection.filter(function(model) { 
  		return model.get('markedForDelete') == true; 
  	});
  	this.collection.batchDelete(models)
  }
});
