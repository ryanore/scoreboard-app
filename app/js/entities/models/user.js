import {Model} from 'backbone';

let UserModel = Model.extend({
	idAttribute: '_id',
	urlRoot: API + 'users',
	validation: null,
	errors: [],

	/**
	 * Initialize Model with validation object
	 * @param  {Object} vals    Initial values, not used here (see Backbone docs)
	 * @param  {Object} options Config options (see Backbone docs)
	 * @return {null}
	 */
	initialize(vals, options = {}) {
		if( options.validation ){
			this.validation = options.validation;
		}
	},
	

	/**
	 * Override Backbone.Save and add a hook
	 */
	save(key, val, options) {
    this.beforeSave(key, val, options);
    return Backbone.Model.prototype.save.call(this, key, val, options);
  },


  /**
   * Before Saving Do a couple things
   * @return {null}
   */
  beforeSave() {
  	this.unset('password_confirm');
  }
	
});

export default UserModel;