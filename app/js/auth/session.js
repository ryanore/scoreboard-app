import radio from 'backbone.radio';

/**
 * Session Controls auth/logged in state as well as level of access for the user
 * @type {[type]}
 */
let Session = class {
	constructor() {
		this.loggedIn = false;
		this.access = -1;
		this.user = null;
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

	logOutUser() {
		this.loggedIn = false;
		this.user = null;
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
		radio.trigger('auth', 'logged:out');
	}

	validateToken() {
		if(localStorage.getItem('access_token')) {
			//validate token against web service
			this.update({
				username: 'ryanore',
				email: 'ryan@ryanore.com'
			});
		} else {
			console.log('NO TOKEN ');
		}
	}

	update() {
		if(data.access_token && data.user){
			localStorage.setItem('access_token', data.access_token );
			localStorage.setItem('user', data.user);
			this.loggedIn = true;
			this.user = data.user;
			this.access_token = data.access_token;
			radio.trigger('auth', 'logged:out');
		}
	}
};

export default new Session();
