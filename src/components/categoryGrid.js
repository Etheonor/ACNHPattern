import React from "react";
import styles from "./categoryGrid.module.scss";
import CategoryButton from "./buttons/categoryButton";
import { Link } from "gatsby";

const CategoryGrid = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.categoryGrid}>
      <Link to="/cloth">
        <CategoryButton title="Clothing" />
      </Link>
      <Link to="/walls">
        <CategoryButton title="Walls" />
      </Link>
      <Link to="/floors">
        <CategoryButton title="Floors" />
      </Link>
      <Link to="/signs">
        <CategoryButton title="Signs" />
      </Link>
    </div>
  );
};

export default CategoryGrid;
