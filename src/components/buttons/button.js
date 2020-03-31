import React from "react";
import styles from "./button.module.css";

const Button = props => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.image && <img src={props.image}></img>}
      <button>{props.label}</button>
    </div>
  );
};

export default Button;
