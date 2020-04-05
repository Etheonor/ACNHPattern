import React from "react";
import styles from "./patternCard.module.scss";


const PatternCard = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.patternCard}>
      <p>{props.creatorCode}</p>
      <p>{props.designCode}</p>
      <p>{props.user}</p>
      <img src={props.patternImage} alt=''/>
    </div>
  );
};

export default PatternCard;
