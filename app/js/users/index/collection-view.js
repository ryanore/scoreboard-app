import {CompositeView} from 'backbone.marionette';
import ItemView from './item-view';
import template from './collection-template.hbs';
import Radio from 'backbone.radio';

let	UserChannel = Radio.channel('UserChannel');

export default CompositeView.extend({
	template: template,
  childView: ItemView,
  childViewContainer: 'tbody',
  renderOnSort: true,
  selected: [],

  initialize() {
  	this.collection.sortByField('username');
  	this.listenTo(this.collection, 'change:markedForDelete', this.handleSelectRow );
  },

  events: {
  	'click [data-sort]': 'handleSortClick',
  	'change .selectAll': 'handleSelectAll'
  },

  onRender() { 
		let dir = this.collection.rev ? 'desc' :  '';
		this.$('[data-sort="'+this.collection.sort_key+'"]').addClass('sort '+ dir);
  },

  /**
   * Handle column heading click, sort table by column by calling method on SortableDeletable collection
   * @param  {Event} e Click event
   * @return {null}
   */
  handleSortClick(e) {
  	this.collection.sortByField(e.target.getAttribute('data-sort'));
  },


	/**
	 *	Handle row selection
	 *	Makes delete button disabled when none selected
	 */
	handleSelectAll(e) {
		this.collection.invoke('set', {'markedForDelete':  e.target.checked});
	},


	/**
	 *	Delete users from collection
	 *	If there are a bunch, then batch delete, 
	 *	otherwise broadcast for models to delete themselves
	 */
	triggerDelete() {
   	let selected = this.collection.where({markedForDelete: true});
		if( confirm('You sure you wanna delete? ' + selected.length + ' users')){
			if( typeof this.collection.batchDelete != 'undefined' ){
				this.collection.batchDelete(selected);
				this.$('[type="checkbox"]').prop('checked', false);
			}
		}
	}
});
