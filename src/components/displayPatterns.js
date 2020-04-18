import React, { useState, useEffect } from "react";
import styles from "./displayPatterns.module.scss";
import PatternCard from "./patternCard";
import { firebase } from "../API/Firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

const db = firebase.firestore();

const DisplayPatterns = props => {
  const [currentCards, setCurrentCards] = useState([]);
  const [docIndex, setDocIndex] = useState({
    first: {},
    last: {},
  });
  const patternPerPage = 6;

  const initialData = ref => {
    return ref.limit(patternPerPage);
  };
  // const myPage = db.collection("Users").doc(user.uid);

  const fetchMoreData = ref => {
    retrievePatterns(ref.startAfter(docIndex.last).limitToLast(patternPerPage));
  };

  useEffect(
    () => {
      retrievePatterns(initialData(props.collection));
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const retrievePatterns = ref => {
    const newState = [...currentCards];
    ref
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          newState.push(doc.data());
          newState[newState.length - 1].id = doc.id;
        });
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
  const breakpointColumnsObj = {
    default: 3,
    1920: 3,
    1440: 2,
    1000: 1,
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div>
      <InfiniteScroll
        className={styles.infinite}
        dataLength={currentCards.length}
        next={() => fetchMoreData(props.collection)}
        hasMore={true}
      >
        <div className={styles.container}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonGrid}
            columnClassName={styles.masonColumn}
          >
            {currentCards ? (
              currentCards.map((value, index) => {
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
                    updatePatterns={retrievePatterns}
                  />
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </Masonry>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default DisplayPatterns;
