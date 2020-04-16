import React from "react";
import { Link } from "gatsby";
import styles from "./footer.module.scss";
import Donate from "../buttons/donate";
import boy from "../../images/boy.png"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMenu}>
        <Link to="/about/">About</Link> / <Link to="/contact/">Contact me</Link>
      </div>
      <img className={styles.boy} src={boy}/>
      <div className={styles.donate}>
        
        <Donate />
      </div>
    </footer>
  );
};

export default Footer;
