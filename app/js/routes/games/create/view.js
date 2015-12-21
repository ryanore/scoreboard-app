import FormView from '../../../base/forms/form-view';
import validation from './validation';
import template from './template.hbs';

export default FormView.extend({
	template: template,
	className: 'view games__create',
	initialize() {
		this.model.validation = validation;
	}
});
