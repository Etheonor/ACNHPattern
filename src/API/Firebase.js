import firebase from "firebase";

const config = {
  apiKey: `${process.env.GATSBY_FIREBASE_APIKEY}`,
  authDomain: "acnhpattern.firebaseapp.com",
  databaseURL: "https://acnhpattern.firebaseio.com",
  projectId: "acnhpattern",
  storageBucket: "acnhpattern.appspot.com",
  messagingSenderId: "570831707046",
  appId: `${process.env.GATSBY_FIREBASE_APPID}`,
  measurementId: `${process.env.GATSBY_FIREBASE_MEASID}`,
};
firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();

const googleProvider = new firebase.auth.GoogleAuthProvider();

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

//---------------STORAGE---------------//

const uploadImg = () => {
  // Create a reference to 'mountains.jpg'
  console.log("Upload1");
  fetch("./../images/gatsby-astronaut.png")
    .then(response => {
      console.log(response);
	  return new Blob([response], { type: "image/png" });
	  
	
    })
    .then(myblob => {
		const file = new File([myblob], "my_image.png",{type:"image/png", lastModified:new Date()})
		console.log(file)
      // Create a reference to 'mountains.jpg'

      const uploadTask = storageRef
        .child("images/mountains.png")
        .put(
			file
        );
    });
};

export { firebase, signIn, signOut, writeGlobal, uploadImg };
