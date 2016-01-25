import FormView from 'base/forms/form-view';
import template from './changepw.hbs';
import {changePassword as validation} from './validation';
import {apiRoot} from 'config';

export default FormView.extend({
	url: apiRoot + 'users/changepassword',
	template: template,
	className: 'users__changepassword_form ',
	initialize() {
		this.model.validation = validation;
	},
	beforeSave() {
		this.form.username = this.model.get('username');
	},
	onErr() {},
	onSuccess() {
		Session.logOutUser();
		this.render();
	}
});
