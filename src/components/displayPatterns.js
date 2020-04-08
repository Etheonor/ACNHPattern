import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import Button from "./buttons/button";
import nextImg from "../icons/System/arrow-right-line.svg";

const db = firebase.firestore();

const DisplayPatterns = props => {
  const [cards, setCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  let lastCurrentIndex = 0;

  useEffect(() => {
    retrievePatterns();
  }, []);

  const nextPage = () => {
    console.log(lastCurrentIndex);
  };

  const handleCurrentCards = (cards) => {
    const newCurrentcards = []
    for (let i = 0; i < 6; i++) {
      newCurrentcards.push(cards[i]);
    }
    setCurrentCards(newCurrentcards);
  }

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
        const newCurrentcards = [];
        const objsort = objects.sort((a, b) => b.likes.length - a.likes.length);
        setCards(objsort);
        handleCurrentCards(objects)
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      {cards && (
        <div className={styles.displayPatterns}>
          {currentCards.map((value, index) => {
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
      <Button image={nextImg} onClick={nextPage} label="Next page" />
    </div>
  );
};

export default DisplayPatterns;
