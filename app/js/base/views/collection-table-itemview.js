import {ItemView} from 'backbone.marionette';

export default ItemView.extend({
  onRender() {
  	this.listenTo(this.model, 'change:markedForDelete', this.markedForDelete);
  },
  events:{
  	'click': 'handleClickRow',
  	'change [type="checkbox"]': 'handleSelectRow'
  },
  
  /**
   * UI state to reflect model's `markedForDelete` property
   * @return {null}
   */
  markedForDelete() {
  	this.$('[type="checkbox"]').prop('checked', this.model.get('markedForDelete'));
  },

  /**
   * Abstract
   * @return {null}
   */
  rowClicked() {
  	console.log('overwrite rowClicked');
  },

  /**
   * Do nothing if click was on the checkbox.
   * @param  {Event} e Click Event
   * @return {null}
   */
  handleClickRow(e) {
  	if(!e.target.classList.contains('noclick')){
  		this.rowClicked();
  	}
  },

  /**
   * Checkbox selected either manually or otherwise
   * Toggle model as markedForDelete
   * @return {null}
   */
  handleSelectRow(e) {
  	this.model.set('markedForDelete', e.target.checked);
  }

});
