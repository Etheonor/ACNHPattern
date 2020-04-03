import React from "react";
import { Link } from "gatsby";
import styles from "./footer.module.scss";
import Donate from "./buttons/donate";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMenu}>
        <Link to="/about/">About</Link>{" "}
        / <Link to="/contact/">Contact me</Link>
      </div>
      <div className={styles.donate}>
        <Donate />
      </div>
    </footer>
  );
};

export default Footer;
