import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import User from "../user";
import logo from "./../../images/logo.png";

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>
          <Link to="/" className={styles.link}>
            <img src={logo} alt={siteTitle} />
          </Link>
        </h1>
      </div>
    </header>
  );
};
Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
};

export default Header;
