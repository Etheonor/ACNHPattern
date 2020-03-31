import React, { useContext, useEffect } from "react";

// Import Firebase elements and initialize it
import { firebase, signIn, signOut } from "./../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

import Button from "./buttons/button";
import food from "../images/food.png";
import styles from "./user.module.scss";

const User = () => {
  // CHANGE TO FUNCTIONNAL COMPONENT
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const checkUser = () => {
    console.log(state)
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
    <div className={styles.userPanel}>{state.user ?<Button image={food} onClick={signOut} label="Log Out" />:<Button image={food} onClick={signIn} label="Log In" />}
      
      
      <Button image={food} onClick={checkUser} label="Test" />
    </div>
  );
};

export default User;
