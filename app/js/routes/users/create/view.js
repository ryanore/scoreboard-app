import FormView from '../../../base/forms/form-view';
import validation from './validation';
import template from './template.hbs';

export default FormView.extend({
	template: template,
	className: 'view users__create',
	onSuccess() {
		console.log('onSuccess::: render ');
	},	
	onErr() {
		console.log('onErr::: render ');
	},
	initialize() {
		this.model.validation = validation;
	}
});
