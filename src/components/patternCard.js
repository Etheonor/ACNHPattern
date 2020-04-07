import React from "react";
import styles from "./patternCard.module.scss";

const PatternCard = props => {
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
        </div>
      </div>
    </div>
  );
};

export default PatternCard;
