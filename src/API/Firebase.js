import firebase from "firebase";
import { toast } from "react-toastify";

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

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location.reload(true);
    });
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
      console.log(result.user.uid);

      db.collection("Users")
        .doc(result.user.uid)
        .set(
          {
            username: result.user.displayName,
          },
          { merge: true }
        )
        .then(function() {
          window.location.reload(true)
        });
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

const writePattern = patternObject => {
  console.log("WRITE PATTERN");
  db.collection("UserPatterns") // Write user ID and Sub Id List in Firestore database
    .doc()
    .set(patternObject, { merge: true })
    .then(function() {
      toast.success("Your pattern has been uploaded!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  db.collection("UserPatterns")
    .doc("creatorCodes")
    .update({
      creatorCodes: firebase.firestore.FieldValue.arrayUnion({
        user: patternObject.creatorCode,
      }),
    });
};

//---------------STORAGE---------------//

export { firebase, signIn, signOut, writePattern };
