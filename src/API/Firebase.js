import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC9y4s6duE92OWy4PyarHLx4ryYpQ2v-vY",
  authDomain: "acnhpattern.firebaseapp.com",
  databaseURL: "https://acnhpattern.firebaseio.com",
  projectId: "acnhpattern",
  storageBucket: "acnhpattern.appspot.com",
  messagingSenderId: "570831707046",
  appId: "1:570831707046:web:ce6d5f213b66d02acd0d67",
  measurementId: "G-VKL24XSD6J",
};
firebase.initializeApp(config);
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/youtube");

const signOut = () => {
  firebase.auth().signOut();
};

const signIn = callback => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      return firebase.auth().signInWithPopup(googleProvider);
    })
    .then(result => {
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
  db.collection("users") // Write user ID and Sub Id List in Firestore database
    .doc(user.uid)
    .set(object, { merge: true })
    .then(function() {
      console.log(`Doc successfully written!`);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export { firebase, signIn, signOut, writeGlobal };
