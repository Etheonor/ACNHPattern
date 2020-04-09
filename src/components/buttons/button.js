import React from "react";
import styles from "./button.module.scss";

const Button = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div
      className={
        props.specialStyle === "upload" ? styles.uploadButton : styles.button
      }
      onClick={props.onClick}
      role="button"
    >
      {props.image && <img className="remix" src={props.image} alt=""></img>}
      <button>{props.label}</button>
    </div>
  );
};

export default Button;
