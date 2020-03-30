import React, { Component, useContext, useEffect } from "react";

// Import Firebase elements and initialize it
import { firebase, signIn, signOut } from "./../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const User = () => {
  // CHANGE TO FUNCTIONNAL COMPONENT
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const checkStorage = () => {
    console.log(firebase.auth().currentUser);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("test");
        dispatch({
          type: "USER",
          text: {
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
          },
        });
      } else {
        // User is signed out.
        //
        dispatch({
          type: "USER",
          text: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <button size="large" variant="contained" color="primary" onClick={signIn}>
        Connect
      </button>
      <button
        size="large"
        variant="contained"
        color="primary"
        onClick={signOut}
      >
        log out
      </button>
      <button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch({ type: "USER", array: "Build my first Redux app" });
        }}
      >
        Test
      </button>
    </div>
  );
};

export default User;
