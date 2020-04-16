import React from "react";
import styles from "./donate.module.scss";

const Donate = () => {
  return (
    <a href="https://ko-fi.com/Y8Y41LNMX" target="_blank" rel="noopener noreferrer">
      <img
      className={styles.donateButton}
        height="42"
        src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
        border="0"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
  );
};

export default Donate;

/*
PAYPAL BUTTON
<form
  className={styles.button}
  action="https://www.paypal.com/cgi-bin/webscr"
  method="post"
  target="_top"
>
  <input type="hidden" name="cmd" value="_s-xclick" />
  <input type="hidden" name="hosted_button_id" value="WBBAU93HLTUB8" />
  <input
    type="image"
    src={donate}
    border="0"
    name="submit"
    title="PayPal - The safer, easier way to pay online!"
    alt="Donate with PayPal button"
  />
  <img
    alt=""
    border="0"
    src="https://www.paypal.com/en_FR/i/scr/pixel.gif"
    width="1"
    height="1"
  />
</form>;*/
