import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, siteDescription }) => (
	<header
		style={{
			background: `rgb(29, 161, 242)`,
      marginBottom: `1.45rem`,
      height:`100%`
		}}
	>
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 960,
				padding: `1.45rem 1.0875rem`
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link
					to="/"
					style={{
						color: `white`,
						textDecoration: `none`
					}}
				>
					{siteTitle}
				</Link>
			</h1>
			<h2
				style={{
					color: `white`,
					textDecoration: `none`,
					margin: 0
				}}
			>
				{siteDescription}
			</h2>
		</div>
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
