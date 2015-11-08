import Syphon from 'backbone.syphon';
import {Behavior} from 'backbone.marionette';

export default Behavior.extend({
  events: {
    'submit form' : 'handleSubmit'
  },

  initialize() {
    this.listenTo(this.view.options.model, 'change', this.onChange);
  },

  serialize() {
  	console.log('serialize ');
    this.view.form = Syphon.serialize(this);
  },

  deserialize() {
  	console.log('deserialize ', Syphon.deserialize(this, this.view.form));
    return Syphon.deserialize(this, this.view.form);
  },

  onChange() {
  	console.log('onChange ');
    this.view.form = this.view.model.attributes;
    this.deserialize();
  },

  onBeforeRender() {
  	  	console.log('onBeforeRender ');

    if (this.view.form) {
      this.serialize();
    }
  },

  onRender() {
  	  	console.log('onRender ');

  },
  onDomRefresh() {
  	  	console.log('onDomRefresh ');
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
