import React, { Component } from "react";

// Import Firebase elements and initialize it
import { firebase, signIn, signOut, writeGlobal } from "./../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

class User extends Component {
  state = {
    user: null,
    test: [],
  };

  checkStorage = () => {
    console.log(firebase.auth().currentUser);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === nextState) {
      return false;
    } else return true;
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("test");
        this.setState({
          user: {
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
          },
        });
        // User is signed in.
      } else {
        // User is signed out.
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        <button
          size="large"
          variant="contained"
          color="primary"
          onClick={signIn}
        >
          ConnectF
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
          onClick={this.checkStorage}
        >
          Test
        </button>
        <p>{this.state.user && `Welcome ${this.state.user.username}!`}</p>
      </div>
    );
  }
}

export default User;
