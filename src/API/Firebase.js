import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBEIQYoz41msc4oL8Q5P5cnfpD_q4H7gS0',
	authDomain: 'sweetter-dca61.firebaseapp.com',
	databaseURL: 'https://sweetter-dca61.firebaseio.com',
	projectId: 'sweetter-dca61',
	storageBucket: 'sweetter-dca61.appspot.com',
	messagingSenderId: '390687528817',
	appId: '1:390687528817:web:2c22062a3abc8effe808d0',
	measurementId: 'G-G1BHXJ6YZH'
};
firebase.initializeApp(config);
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/youtube');

const signOut = () => {
	firebase.auth().signOut();
};

const signIn = (callback) => {
	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
			return firebase.auth().signInWithPopup(googleProvider);
		})
		.then((result) => {
			/*writeGlobal(result.user, {
				userName: result.user.displayName,
				userMail: result.user.email
			});*/
			return result;
		})
		.then(callback)
		.catch(function(error) {
			// Handle Errors here.
			console.log(error.code);
			console.log(error.message);
			// The email of the user's account used.
			console.log(error.email);
			// The firebase.auth.AuthCredential type that was used.
			console.log(error.credential);
			// ...
		});
};

//---------------FIRESTORE---------------//

const writeGlobal = (user, object) => {
	db // Write user ID and Sub Id List in Firestore database
		.collection('users')
		.doc(user.uid)
		.set(object, { merge: true })
		.then(function() {
			console.log(`Doc successfully written!`);
		})
		.catch(function(error) {
			console.error('Error writing document: ', error);
		});
};

export { firebase, signIn, signOut, writeGlobal };
