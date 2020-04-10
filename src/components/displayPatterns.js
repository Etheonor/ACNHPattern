import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import InfiniteScroll from "react-infinite-scroll-component";

const db = firebase.firestore();
const ref = db.collection("UserPatterns");

const DisplayPatterns = props => {
  const [currentCards, setCurrentCards] = useState([]);
  const [docIndex, setDocIndex] = useState({
    first: {},
    last: {},
  });

  const patternPerPage = 6;

  const patterns = ref
    .where("patternCat", "array-contains", props.category)
    .orderBy("likeCount", "desc")
    .limit(patternPerPage);

  const fetchMoreData = () => {
    retrievePatterns(
      ref
        .where("patternCat", "array-contains", props.category)
        .orderBy("likeCount", "desc")
        .startAfter(docIndex.last)
        .limitToLast(patternPerPage)
    );
  };

  useEffect(() => {
    retrievePatterns();
  }, []);

  const retrievePatterns = (ref = patterns) => {
    const newState = [...currentCards];
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
        setDocIndex({
          first: querySnapshot.docs[0],
          last: querySnapshot.docs[querySnapshot.docs.length - 1],
        });
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      <InfiniteScroll
        dataLength={currentCards.length}
        next={fetchMoreData}
        hasMore={true}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default DisplayPatterns;