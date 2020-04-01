import React from "react";
import styles from "./button.module.scss";

const Button = props => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.image && <img className='remix'src={props.image}></img>}
      <button>{props.label}</button>
    </div>
  );
};

export default Button;
