import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import Button from "./buttons/button";
import nextImg from "../icons/System/arrow-right-line.svg";

const db = firebase.firestore();
const patterns = db.collection('UserPatterns').orderBy('likeCount', "desc").limit(6);

const DisplayPatterns = props => {
  const [cards, setCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    retrievePatterns();
  }, []);

  useEffect(() => {
    setCurrentCards(cards[currentIndex]);
    console.log(currentIndex);
  }, [currentIndex]);

  const nextPage = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo(0, 285);
    }
  };
  const previousPage = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo(0, 285);
    }
  };

  const chunk = (arr, chunkSize) => {
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  };

  const retrievePatterns = () => {
    

    const newState = [];
    patterns
      .where("patternCat", "array-contains", props.category)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          newState.push(doc.data());
          newState[newState.length - 1].id = doc.id;
        });
        console.log('DB USED')
        return newState;
      })
      .then(objects => {
        const newCards = chunk(objects, 6);
        setCards(newCards);
        setCurrentCards(newCards[currentIndex]);
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      {currentCards && (
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
                updatePatterns={retrievePatterns}
              />
            );
          })}
        </div>
      )}
      {currentIndex - 1 >= 0 && (
        <Button image={nextImg} onClick={previousPage} label="Previous page" />
      )}
      {currentIndex + 1 < cards.length && (
        <Button image={nextImg} onClick={nextPage} label="Next page" />
      )}
    </div>
  );
};

export default DisplayPatterns;
