import { Link } from 'gatsby';
import React from 'react';
import styles from './menu.module.css';

const Menu = () => {
	return (
		<ul className={styles.menu}>
			<li className={styles.catPets}>
				<Link to="/cute-pets/">Cute Pets</Link>
			</li>
			<li className={styles.catWorld}>
				<Link to="/beautiful-world/">Beautiful World</Link>
			</li>
			<li className={styles.catLifestyle}>
				<Link to="/cool-lifestyle/">Cool Lifestyle</Link>
			</li>
			<li className={styles.catFood}>
				<Link to="/delicious-food/">Delicious Food</Link>
			</li>
			<li className={styles.catFun}>
				<Link to="/funny-things/">Funny Things</Link>
			</li>
		</ul>
	);
};

export default Menu;
