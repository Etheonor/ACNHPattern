import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styles from "./header.module.css";
import User from "./user";

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>
          <Link to="/" className={styles.link}>
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div className={styles.userPanel}>
        <User />
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
