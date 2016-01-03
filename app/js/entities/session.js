import {history} from 'backbone';

/**
 * Session Controls auth/logged in state as well as level of access for the user
 * @type {[type]}
 */
let Session = class {
	constructor() {
		this.user = null;
		this.access_token = localStorage.getItem('access_token');
		this.loggedIn = false;
		this.access = -1;
	}

	/**
	 * Checks user's access level is at least what is passed in
	 * User Access Levels:
	 * - 0 no admin rights, normal user
	 * - 1 admin rights
	 * - 2 superadmin
	 * @param  {Number} min the minimum level must be
	 * @return {Boolean} 
	 */
	level(min) {
		if( typeof min !== 'undefined' ){
			return !!this.loggedIn && (this.access >= min);			
		}
		return this.access;
	}


	/**
	 * Returns whether the loggged in user's id matches that which is requested
	 * @param  {String}  id The _id being requested
	 * @return {Boolean} 
	 */
	isUser(id) {
		let is = false;
		if( this.user && this.loggedIn ){
			is = this.user._id === id ;
		}
		return is;
	}

	

	/**
	 * [logOutUser description]
	 * @return {[type]} [description]
	 */
	logOutUser() {
		this.loggedIn = false;
		this.access = -1;
		this.user = null;
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
 		// Radio.trigger('AuthChannel','userLogged:in');	
	}


	/**
	 * [validateToken description]
	 * @return {[type]} [description]
	 */
	validateToken() {
    let defer = $.Deferred();
     
		let self = this;
		
		if (this.access_token) {
			$.ajax({
					url: API + 'verify'
				})
				.done(function(data, textStatus, jqXHR) {
					self.update(data);
					defer.resolve();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					self.logOutUser();
					defer.resolve();
				});
		} else {
			console.log('no access_token in storage');
			self.logOutUser();
			defer.resolve();
		}
    return defer;
	}



	/**
	 * [update description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	update(data) {
		if(data.access_token && data.user){
			localStorage.setItem('access_token', data.access_token );
			localStorage.setItem('user', data.user);
			this.loggedIn = true;
			this.user = data.user;
			this.access = data.user.access;
			this.access_token = data.access_token;
			// console.log('USER LOGGED IN ', this.user);
 			// Radio.trigger('AuthChannel','userLogged:in');	
		}else{
			console.log('NO UPDATE ', data);
		}
	}

	getAccessToken() {
		return this.access_token;
	}
};

export default new Session();
