import React from "react";
import styles from "./categoryButton.module.scss";

const categoryButton = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.categoryButton}>
      <h2>{props.title || "Default"}</h2>
    </div>
  );
};

export default categoryButton;
