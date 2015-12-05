import {CompositeView} from 'backbone.marionette';
import ItemView from './item-view';
import template from './collection-template.hbs';

export default CompositeView.extend({
	template: template,
  childView: ItemView,
  childViewContainer: 'tbody',

  initialize() {
  	this.collection.sort_key = 'username';
  },

  events: {
  	'click [data-sort]': 'handleSortClick'
  },

  handleSortClick(e) {
  	this.collection.sortByField(e.target.getAttribute('data-sort'));
  },

  onRender() {
		let dir = this.collection.rev ? 'desc' :  '';
		this.$('[data-sort="'+this.collection.sort_key+'"]').addClass('sort '+ dir);
  },

  deleteUsers() {
  	let models = this.collection.filter(function(model) { 
  		return model.get('markedForDelete') == true; 
  	});
  	this.collection.batchDelete(models)
  }
});
