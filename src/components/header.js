import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import logo from './../images/sweetter-logo.png';
import styles from './header.module.css';
import Menu from './menu'

const Header = ({ siteTitle, siteDescription }) => (
	<header className={styles.header}>
		<div className={styles.title}>
			<img className={styles.logo} src={logo} alt="Sweetter logo" />
			<h1>
				<Link to="/" className={styles.link}>
					{siteTitle}
				</Link>
			</h1>
			<h2>{siteDescription}</h2>
		</div>
    <Menu className={styles.menu}/>
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
