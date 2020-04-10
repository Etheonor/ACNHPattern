import React, { useState, useEffect } from "react";
import styles from "./searchDesigner.module.scss";
import { firebase } from "../API/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatternCard from "./patternCard";
import Button from "./buttons/button";

const db = firebase.firestore();

const SearchDesigner = props => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    retrieveQuery(props.creator)
  }, []);

  const retrieveQuery = userQuery => {
    const newState = [];
    if (userQuery !== undefined) {
      db.collection("UserPatterns")
        .where("creatorCode", "==", userQuery)
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
          if (objects.length === 0) {
            toast.info("Designer not found 💔");
          }
          const objsort = objects.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          setCards(objsort);
        });
    }
  };

  const search = () => {
    const userQuery = document.getElementById("site-search").value;
    retrieveQuery(userQuery);
  };
  return (
    <div>
      {!props.creator && (
        <div>
          <h2>Search Designer</h2>
          <div className={styles.inputForm}>
            <label htmlFor="site-search">
              Find a designer with his/her designer tag
            </label>
            <input
              className={styles.inputSearch}
              type="search"
              id="site-search"
              name="q"
              aria-label="Search through site content"
            />
            <Button label="Search" onClick={search}>
              Search
            </Button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default SearchDesigner;
