import React, { useState, useEffect, useContext } from "react";
import styles from "./myPage.module.scss";
import { firebase } from "../API/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatternCard from "../components/patternCard";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
const db = firebase.firestore();
const user = firebase.auth().currentUser;

const MyPageComp = props => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const [newCards, setNewCards] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(
    () => {
      if (state.user) {
        display();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.user]
  );

  const display = () => {
    let newState = [...newCards];
    db.collection("UserPatterns")
      .where("likes", "array-contains", state.user.uid)
      .orderBy("likeCount", "desc")
      .get()
      .then(result => {
        result.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          newState.push(doc.data());
          newState[newState.length - 1].id = doc.id;
        });
        setNewCards(newState);
      });
  };

  return (
    <div>
      <h2>💕 My Favorites</h2>
      <div className={styles.displayPatterns}>
        {newCards ? (
          newCards.map((value, index) => {
            return (
              <PatternCard
                key={index}
                user={value.user}
                creatorCode={value.creatorCode}
                designCode={value.designCode}
                patternImage={value.patternImage}
                designName={value.designName}
                likes={value.likes}
                desc={value.description}
                likeCount={value.likeCount}
                object={value.id}
              />
            );
          })
        ) : (
          <p>TEST</p>
        )}
      </div>
    </div>
  );
};

export default MyPageComp;
