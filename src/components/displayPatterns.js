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
          newState.push(doc.data());
          newState[newState.length - 1].id = doc.id;
        });
        return newState;
      })
      .then(objects => {
        const objsort = objects.sort((a, b) => b.likes.length - a.likes.length);
        setCards(objsort);
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
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
                likes={value.likes}
                object={value.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayPatterns;
