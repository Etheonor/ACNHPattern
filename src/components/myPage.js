import React, { useState, useEffect } from "react";
import styles from "./searchDesigner.module.scss";
import { firebase } from "../API/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatternCard from "./patternCard";
import Button from "./buttons/button";

const db = firebase.firestore();
const user = firebase.auth().currentUser;

const MyPageComp = props => {
  const [cards, setCards] = useState([]);
  const [test, setTest] = useState(false)

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          display(user);
          console.log('test')
        } else {
        }
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const display = user => {
    let newState = [...cards];
    db.collection("Users")
      .doc(user.uid)
      .get()
      .then(result => {
        return result.data().likes;
      })
      .then(result => {
        result.map(el => {
          db.collection("UserPatterns")
            .doc(el)
            .get()
            .then(result => {
              newState.push(result.data());
              newState[newState.length - 1].id = result.id;
              return newState;
            });
        });
        return newState;
      })
      .then(result => {
        setCards(result);
      }).then(() => {
        setTest(true)
      });
  };

  return (
    <div>
      {test ? (
        <div>
          {cards.map((value, index) => {
            return (
              <PatternCard
                key={index}
                user={value.user}
                creatorCode={value.creatorCode}
                designCode={value.designCode}
                patternImage={value.patternImage}
                designName={value.designName}
                likes={value.likes}
                likeCount={value.likeCount}
                object={value.id}
              />
            );
          })}
        </div>
      ) : <p>Lol.</p>}
    </div>
  );
};

export default MyPageComp;
