import {Model} from 'backbone';

export default Model.extend({
	defaults: {
		name: ''
	},
	validate() {
		if( !this.name.length ){
			return false;
		}
	}
});
