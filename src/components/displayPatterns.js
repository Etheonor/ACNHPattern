import React, { useState } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import Button from "./buttons/button";

const db = firebase.firestore();

const patterns = [];
let newCards = null;

const DisplayPatterns = props => {
  const [cards, setCards] = useState(false);
  const handleTest = () => {
    db.collection("UserPatterns")
      .where("patternCat", "array-contains", props.category)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          patterns.push(doc.data());
        });
      });
    newCards = "test";

    setCards(true);
    console.log("this is" + newCards);
    return newCards;
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.displayPatterns}>
      <p> Welcome patterns {props.category}</p>
      {cards ? <PatternCard/> : null} 
      <Button onClick={handleTest} label="test" />
    </div>
  );
};

export default DisplayPatterns;
