import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";

// Import Firebase elements and initialize it
import { firebase, signIn, signOut } from "../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

import styles from "./user.module.scss";

//IMPORT MATERIAL UI
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const User = () => {
  const classes = useStyles();

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
          uid: user.uid,
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
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            className={classes.button}
            onClick={signOut}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>

          <Button className={classes.button} startIcon={<CloudUploadIcon />}>
            <Link style={{ textDecoration: 'none', color: 'white'}} to="/upload-pattern">Upload</Link>
          </Button>

          <Button className={classes.button} startIcon={<SearchIcon />}>
            <Link style={{ textDecoration: 'none', color: 'white'}} to="/search">Search by designer</Link>
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            className={classes.button}
            onClick={signIn}
            startIcon={<AssignmentIndIcon />}
          >
            Login
          </Button>

          <Button className={classes.button} startIcon={<SearchIcon />}>
            <Link style={{ textDecoration: 'none', color: 'white'}} to="/search">Search by designer </Link>
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default User;
