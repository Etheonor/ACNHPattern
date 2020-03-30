import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import styles from "./header.module.css";
import Menu from "./menu";
import { GlobalDispatchContext, GlobalStateContext } from "../context/GlobalContextProvider";

const Header = ({ siteTitle }) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  console.log(dispatch);
  console.log(state);
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>
          <Link to="/" className={styles.link}>
            {siteTitle}
          </Link>
        </h1>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "USER" });
        }}
      >
        Test
      </button>
      <p>{state.user}</p>
      <Menu className={styles.menu} />
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
