import React from "react";
import styles from "./categoryGrid.module.scss";
import CategoryButton from "./buttons/categoryButton"

const CategoryGrid = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.categoryGrid}>
      <CategoryButton title='Cloth'/>
      <CategoryButton title='Walls'/>
      <CategoryButton title='Floors'/>
    </div>
  );
};

export default CategoryGrid;
