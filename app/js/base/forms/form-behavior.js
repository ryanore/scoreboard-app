import Syphon from 'backbone.syphon';
import {Behavior} from 'backbone.marionette';
import Validation from 'backbone.validation';

export default Behavior.extend({
	
	events: {
		'submit form' : 'handleSubmit'
	},

	initialize() {
		this.listenTo(this.view.options.model, 'change', this.onChange);
		this.listenTo(this.view.options.model, 'validated:invalid', this.inValid);
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
		Validation.bind(this.view);
	},


	/**
	 * Syphon input vars into an object that the view keeps reference to
	 * @return {null}
	 */
	serialize() {
		this.view.form = Syphon.serialize(this);
	},


	/**
	 * Syphon injects form values back into the dom
	 * @return {null}
	 */
	deserialize() {
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
		this.view.form = Syphon.serialize(this);
	}
});
