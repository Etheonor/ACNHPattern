import React from "react";
import styles from "./patternCard.module.scss";
import { firebase } from "../API/Firebase";
import imgNoLike from "../images/like2.png";
import imgLike from "../images/like1.png";

const PatternCard = props => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const patternRef = db.collection("UserPatterns").doc(props.object);

  const userLiked = props.likes.includes(user.uid);

  const checkUser = () => {
    console.log(props.object);

  };

  const addLike = () => {
    console.log(patternRef)
    patternRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
    console.log('added like')

  }
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.patternCard}>
      <div className={styles.imageContainer}>
        <img src={props.patternImage} alt="" className={styles.patternImage} />
        <h3 className={styles.patternTitle}>{props.designName}</h3>

        <div className={styles.textContainer}>
          <div className={styles.item}>
            <h3>Creator Code:</h3> <p>{props.creatorCode}</p>
          </div>
          <div className={styles.item}>
            <h3>Design Code:</h3>
            <p>{props.designCode}</p>
          </div>
          <div className={styles.item}>
            <h3>Designer:</h3>
            <p>{props.user}</p>
          </div>
          <div className={`${styles.item} ${styles.likes}`}>
            {userLiked ? (
              <img src={imgLike} /> 
            ) : (
              <button>
                <img src={imgNoLike} />
              </button>
            )}
            <p>{props.likes.length}</p>
          </div>
          <button onClick={addLike}>Test</button>
        </div>
      </div>
    </div>
  );
};

export default PatternCard;
