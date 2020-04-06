import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";

const db = firebase.firestore();

const DisplayPatterns = props => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    retrievePatterns();
  }, []);

  const retrievePatterns = () => {
    const newState = [];
    db.collection("UserPatterns")
      .where("patternCat", "array-contains", props.category)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          newState.push(doc.data());
        });
        return newState;
      })
      .then(objects => {
        console.log(objects);
        setCards(objects);
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      <p> Welcome patterns {props.category}</p>
      {cards && (
        <div className={styles.displayPatterns}>
          {cards.map((value, index) => {
            return (
              <PatternCard
                key={index}
                user={value.user}
                creatorCode={value.creatorCode}
                designCode={value.designCode}
                patternImage={value.patternImage}
                designName={value.designName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayPatterns;
