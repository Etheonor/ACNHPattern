import React, { Component } from 'react';

// Import Firebase elements and initialize it
import { firebase, signIn, signOut, writeGlobal } from './../API/Firebase';
import 'firebase/auth';
import 'firebase/firestore';

class User extends Component {
	state = {
		user: null
	};

	componentDidMount() {
        var user = firebase.auth().currentUser;
        console.log(user)
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
                this.setState({ user: user.displayName });
				// User is signed in.
				let username = user.displayName;
				let email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				console.log(username, email);
				// ...
			} else {
				// User is signed out.
				// ...
				console.log('User is plus la');
                this.setState({ user: null });
			}
		});
	}

	render() {
		return (
			<div>
				<button size="large" variant="contained" color="primary" onClick={signIn}>
					Connect
				</button>
				<button size="large" variant="contained" color="primary" onClick={signOut}>
					log out
				</button>
				<p>{this.state.user && `Welcome ${this.state.user}!`}</p>
			</div>
		);
	}
}

export default User;
