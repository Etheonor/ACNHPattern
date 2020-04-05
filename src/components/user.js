import React, { useContext, useEffect } from "react";
import { Link } from "gatsby"

// Import Firebase elements and initialize it
import { firebase, signIn, signOut } from "../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

import Button from "./buttons/button";
import login from "./../icons/Logos/google-fill.svg";
import logout from "./../icons/System/logout-box-line.svg";
import addimg from "./../icons/System/add-circle-line.svg";
import styles from "./user.module.scss";

const User = () => {
  // CHANGE TO FUNCTIONNAL COMPONENT
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);


  const dispatchUser = user => {
    if (state.user === null) {
      dispatch({
        type: "USER",
        text: {
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid
        },
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //User sign in
        dispatchUser(user);
      } else {
        // User is signed out.
        dispatch({
          type: "USER",
          text: null,
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.userPanel}>
      {state.user ? (
        <div>
          <Button image={logout} onClick={signOut} label="Log Out" />

          <Link to="/upload-pattern"><Button image={addimg} label="Design" /></Link>
        </div>
      ) : (
        <Button image={login} onClick={signIn} label="Log In" />
      )}
    </div>
  );
};

export default User;
