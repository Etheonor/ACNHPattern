import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import Button from "./buttons/button";
import nextImg from "../icons/System/arrow-right-line.svg";

const db = firebase.firestore();
const ref = db.collection("UserPatterns");

const DisplayPatterns = props => {
  const [currentCards, setCurrentCards] = useState([]);
  const [docIndex, setDocIndex] = useState({
    first: {},
    last: {},
  });
  const [firstPattern, setFirstPattern] = useState('')


  const patternPerPage = 6;

  const patterns = ref
    .where("patternCat", "array-contains", props.category)
    .orderBy("likeCount", "desc")
    .limit(patternPerPage);

  const nextPage = () => {
    window.scrollTo(0, 285);
    retrievePatterns(
      ref
        .where("patternCat", "array-contains", props.category)
        .orderBy("likeCount", "desc")
        .startAfter(docIndex.last)
        .limitToLast(patternPerPage)
    );
  };

  const prevPage = () => {
    window.scrollTo(0, 285);
    retrievePatterns(
      ref
        .where("patternCat", "array-contains", props.category)
        .orderBy("likeCount", "desc")
        .endBefore(docIndex.first)
        .limitToLast(patternPerPage)
    );
  };

  useEffect(() => {
    retrievePatterns();
  }, []);

  const retrievePatterns = (ref = patterns) => {
    const newState = [];
    ref
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          newState.push(doc.data());
          newState[newState.length - 1].id = doc.id;
        });
        console.log("DB USED");
        setCurrentCards(newState);
        return querySnapshot;
      })
      .then(querySnapshot => {
        if (ref == patterns) {
          setFirstPattern(querySnapshot.docs[0])
          console.log(querySnapshot.docs[0])
        }
        setDocIndex({
          first: querySnapshot.docs[0],
          last: querySnapshot.docs[querySnapshot.docs.length - 1],
        });
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
                likeCount={value.likeCount}
                object={value.id}
                updatePatterns={retrievePatterns}
              />
            );
          })}
        </div>
      )}

      {firstPattern==docIndex.first && <Button image={nextImg} onClick={prevPage} label="Previous page" />}

      <Button image={nextImg} onClick={nextPage} label="Next page" />
    </div>
  );
};

export default DisplayPatterns;
