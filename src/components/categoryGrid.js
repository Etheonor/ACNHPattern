import React from "react";
import styles from "./categoryGrid.module.scss";
import CategoryButton from "./buttons/categoryButton";
import { Link } from "gatsby";
import mabel from '../images/mabel.png'
import nook from '../images/nk.png'
import plot from '../images/plot.png'
import thib from '../images/thib.png'
import gre from '../images/gre.png'

const CategoryGrid = props => {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
    <div className={styles.categoryGrid}>
      <Link to="/clothing">
        <CategoryButton img={mabel} title="Clothing" />
      </Link>
      <Link to="/floors">
        <CategoryButton img={plot} title="Floors" />
      </Link>
      <Link to="/paths">
        <CategoryButton img={thib} title="Paths" />
      </Link>
      <Link to="/signs">
        <CategoryButton img={nook} title="Signs" />
      </Link>
      <Link to="/walls">
        <CategoryButton img={gre} title="Walls" />
      </Link>
    </div>
  );
};

export default CategoryGrid;
