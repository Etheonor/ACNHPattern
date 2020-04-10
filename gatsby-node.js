const path = require("path");
const data = require("./src/creatorPages.json");
const firebase = require("firebase");
const template = path.resolve("./src/creatorPages.js");

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

const creatorRef = db.collection("UserPatterns").doc("creatorCodes");

//Fixed webpack error with firebase, source: https://github.com/firebase/firebase-js-sdk/issues/2222
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(
        context,
        request,
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/;
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, "umd " + request);
        }
        callback();
      }),
    });
  }
};

exports.createPages = async ({ actions }) => {
  await creatorRef
    .get()
    .then(function(querySnapshot) {
      let newState = null;
      // doc.data() is never undefined for query doc snapshots
      newState = querySnapshot.data().creatorCodes;
      console.log(newState);
      var fs = require("fs");
      fs.writeFile(
        "./src/creatorPages.json",
        JSON.stringify(querySnapshot.data().creatorCodes),
        function(err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    })
    .then(() => {
      const { createPage } = actions;
      data.forEach(object => {
        const path = object.user;
        createPage({
          path,
          component: template,
          context: object,
        });
      });
    });
};
