import FormView from 'base/forms/form-view';
import {apiRoot} from 'config';
import template from './template.hbs';
import validation from './validation';

export default FormView.extend({
	url: apiRoot + 'users/forgotpassword',
	template: template,
	className: 'view users__login',
	initialize() {
		this.model.validation = validation;
	},
	beforeSave() {
		console.log('before ', this.url);
	},
	onErr() {
		this.render();
	},
	onSuccess() {
		this.render();
	}
});
