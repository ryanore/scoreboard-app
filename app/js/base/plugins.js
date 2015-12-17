// Jquery plugins and Bootstrap.js  require jquery to be a global  ¯\_(ツ)_/¯
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('bootstrap-sass');


/*
* Extend Backbone.validation callbacks to work with bootstrap
*/
_.extend(Backbone.Validation.callbacks, {
	valid: function(view, attr, selector) {
		let control = view.$('[' + selector + '=' + attr + ']');
		let group = control.parents(".control-group")
			.removeClass("error");
		return control.tooltip("hide");
	},

	invalid: function(view, attr, error, selector) {
		let control = view.$('[' + selector + '=' + attr + ']');
		let group = control.parents(".control-group")
			.addClass("error");

		let position = control.data("tooltip-position") || "top";

		control.tooltip({
			placement: position,
			trigger: "manual",
			title: error
		});
		return control.tooltip("show");
	}
});
