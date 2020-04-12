import React, { useState, useEffect } from "react";
import styles from "./patternCard.module.scss";
import { firebase } from "../API/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgNoLike from "../images/like2.png";
import imgLike from "../images/like1.png";
import ImgPattern from "./structuralComponents/imgPattern";

const PatternCard = props => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const patternRef = db.collection("UserPatterns").doc(props.object);
  const increment = firebase.firestore.FieldValue.increment(1);
  const [like, setLike] = useState({
    isLiked: user ? props.likes.includes(user.uid) : false,
    likeCount: props.likeCount,
  });

  useEffect(
    () => {
      setLike({
        isLiked: user ? props.likes.includes(user.uid) : false,
        likeCount: props.likeCount,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.likeCount]
  );

  const addLike = () => {
    if (user !== null && props.likes.includes(user.uid) === false) {
      patternRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
        likeCount: increment,
      });

      setLike({
        isLiked: true,
        likeCount: like.likeCount + 1,
      });
    } else if (user === null) {
      toast.error("You have to be logged in to like a pattern!");
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.patternCard}>
      <div className={styles.imageContainer}>
        <ImgPattern images={props.patternImage} />

        <div>
          <h3 className={styles.patternTitle}>{props.designName}</h3>
          {props.desc && <div className={styles.desc}><p>{props.desc}</p></div>}
          <div className={`${styles.item} ${styles.likes}`}>
            {user ? (
              like.isLiked ? (
                <img src={imgLike} alt="You liked this pattern" />
              ) : (
                <button onClick={addLike}>
                  <img src={imgNoLike} alt="click to like this pattern" />
                </button>
              )
            ) : (
              <button onClick={addLike}>
                <img src={imgNoLike} alt="click to like this pattern" />
              </button>
            )}
            <p className={styles.likeCount}>{like.likeCount}</p>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.item}>
            <h3>Creator Code:</h3> <p>{props.creatorCode}</p>
          </div>
          <div className={styles.item}>
            <h3>Design Code:</h3>
            <p>{props.designCode}</p>
          </div>
          <div className={styles.item}>
            <h3>Uploader:</h3>
            <p>{props.user}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternCard;
