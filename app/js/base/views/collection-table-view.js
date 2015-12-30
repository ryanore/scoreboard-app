/**
 * Sortable / Deletable Composite View
 * Requires a Sortable/BatchDelete Collection
 */
import {CompositeView} from 'backbone.marionette';

export default CompositeView.extend({
  events: {
  	'click [data-sort]': 'handleSortClick',
  	'change .selectAll': 'handleSelectAll'
  },

	/**
	 * Marionette Initialze Method
	 * @param  {Object} options You can pass in the default column name to be sorted
	 * @return {null}
	 */
  initialize(options) {
  	if( options.sort ){
  		this.collection.sortByField(options.sort);
  	}
  	this.listenTo(this.collection, 'change:markedForDelete', this.handleSelectRow );
  },

  /**
   * Marionette Callback - after each sort
   * Add class to the sorted column's header
   * @return {[type]} [description]
   */
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
	 *	Delete records from collection
	 *	If there are a bunch, then batch delete,
	 *	otherwise broadcast for models to delete themselves
	 */
	triggerDelete() {
   	let selected = this.collection.where({markedForDelete: true});
		if( confirm('You sure you wanna delete? ' + selected.length)){
			if( typeof this.collection.batchDelete != 'undefined' ){
				this.collection.batchDelete(selected);
				this.$('[type="checkbox"]').prop('checked', false);
			}
		}
	}
});
