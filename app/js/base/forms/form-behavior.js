import Syphon from 'backbone.syphon';
import {Behavior} from 'backbone.marionette';
import Validation from 'backbone.validation';

export default Behavior.extend({
	
	events: {
		'submit form' : 'handleSubmit'
	},

	initialize() {
		this.listenTo(this.view.options.model, 'change', this.onChange);
	},
	

	/**
	 * Before Render, capture view inputs into object
	 * @return {null}
	 */
	onBeforeRender() {
		if (this.view.form) {
			this.serialize();
		}
	},


	/**
	 * After Render add Validation plugin
	 * @return {null}
	 */
	onRender() {
		this.view.form = this.view.model.attributes;
		Validation.bind(this.view);
	},


	/**
	 * Syphon input vars into an object that the view keeps reference to
	 * @return {null}
	 */
	serialize() {
		let include = this.view.model.validation.include;
		if( include ){
			this.view.form = Syphon.serialize(this, {
				include: include
			});
		}
		this.view.form = Syphon.serialize(this);
	},


	/**
	 * Syphon injects form values back into the dom
	 * @return {null}
	 */
	deserialize() {
		let include = this.view.model.validation.include;
		if( include ){
			return Syphon.deserialize(this, this.view.form, {
				include: include
			});
		}
		return Syphon.deserialize(this, this.view.form);

	},


	/**
	 * Each model change, stick model values into dom
	 * @return {[type]} [description]
	 */
	onChange() {
		this.deserialize();
		this.view.model.validate();
	},


	onDomRefresh() {
		if (!this.view.form) {
			this.view.form = this.view.model.attributes;
		}
		this.deserialize();
	},


	handleSubmit(event) {
		event.preventDefault();
		this.serialize();
	}
});
