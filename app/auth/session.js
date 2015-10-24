import radio from 'backbone.radio';
let Session = class {
	constructor() {
		this.loggedIn = true;
		this.access = 1;
		this.user = null;
	}

	level(min) {
		return !!this.loggedIn && (this.access >= min);
	}

	isUser(id) {
		let is = false;
		if( this.user && this.loggedIn ){
			is =  this.user._id === id ;
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
