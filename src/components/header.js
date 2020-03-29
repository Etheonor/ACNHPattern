import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './header.module.css';
import Menu from './menu';

const Header = ({ siteTitle, siteDescription }) => (
	<header className={styles.header}>
		<div className={styles.title}>
			<h1>
				<Link to="/" className={styles.link}>
					{siteTitle}
				</Link>
			</h1>
		</div>
		<Menu className={styles.menu} />
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
	siteDescription: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``,
	siteDescription: ``
};

export default Header;
