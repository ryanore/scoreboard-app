import $ from 'jquery';
import {Collection} from 'backbone';
import {Application} from 'backbone.marionette';
import LayoutView from './application-layout';
import Header from './header/view';
import Footer from './footer/view';
import Session from '../entities/session';
import socket from '../base/socket';

export default Application.extend({
	
	/**
	 * Initialize Application
	 * @return {Marionette.Application}
	 */
	initialize() {
		this.buildDom();
		
		this.addHeaders();

		Session.validateToken().then(() => {
			setTimeout(() => {
				this.start();
			},1);
		});

	},


	/**
	 * Build the HTML Structure and all the main sections
	 * @return {[type]} [description]
	 */
	buildDom() {
		$('body').append('<div id="app-main"></div>');

		this.layout = new LayoutView();		
		this.layout.render();
		
		this.header = new Header();

		this.footer = new Footer();
	},



	/**
	*	Hijacky Sync function to add auth headers
	*	jwt token expects Authorization: Bearer 
	*/
	addHeaders() {
		$.ajaxSetup({
			crossDomain: true,
			beforeSend: function(xhr){
				xhr.setRequestHeader('Authorization', 'Bearer ' + Session.getAccessToken());
				return xhr;
			}
		});

		var backboneSync = Backbone.sync;
		Backbone.sync = function (method, model, options) {
			options.headers = {
				'Authorization': 'Bearer '+Session.getAccessToken()
			};
			backboneSync(method, model, options);
			return model;
		};
	}

});

