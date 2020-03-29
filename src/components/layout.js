/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import './layout.css';
import Helmet from 'react-helmet';
import User from './user';
import GlobalContextProvider, { GlobalDispatchContext } from './../context/GlobalContextProvider';

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	return (
		<GlobalContextProvider>
			<div className="container">
				<Helmet>
					<link
						href="https://fonts.googleapis.com/css?family=Muli:300i,400,600,700,800,900&display=swap"
						rel="stylesheet"
					/>
				</Helmet>

				<div className="top">
					<Header
						siteTitle={data.site.siteMetadata.title}
						siteDescription={data.site.siteMetadata.description}
					/>
				</div>
				<div className="main">
					<div
						style={{
							margin: `0 auto`,
							maxWidth: 960,
							padding: `0 1.0875rem 1.45rem`
						}}
					>
						<main>{children}</main>
						<User />
					</div>
				</div>

				<footer className="bottom">
					<Footer />
				</footer>
			</div>
		</GlobalContextProvider>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
