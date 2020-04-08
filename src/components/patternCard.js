import React, { useState } from "react";
import styles from "./patternCard.module.scss";
import { firebase } from "../API/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgNoLike from "../images/like2.png";
import imgLike from "../images/like1.png";

const PatternCard = props => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const patternRef = db.collection("UserPatterns").doc(props.object);
  const [like, setLike] = useState({
    isLiked: user ? props.likes.includes(user.uid) : false,
    likeCount: props.likes.length,
  });

  const addLike = () => {
    if (like.isLiked === false && user !== null) {
      patternRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
      });
      setLike({
        isLiked: true,
        likeCount: like.likeCount + 1,
      });
    } else if (user === null) {
      toast.error('You have to be logged in to like a pattern!')
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.patternCard}>
      <div className={styles.imageContainer}>
        <img src={props.patternImage} alt="" className={styles.patternImage} />
        <div>
          <h3 className={styles.patternTitle}>{props.designName}</h3>
          <div className={`${styles.item} ${styles.likes}`}>
            {like.isLiked ? (
              <img src={imgLike} alt="You liked this pattern" />
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
