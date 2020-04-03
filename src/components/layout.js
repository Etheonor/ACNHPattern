/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import styles from "./layout.module.scss";
import Helmet from "react-helmet";
import Menu from "./menu";
import User from "./user"

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
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Francois+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
          rel="stylesheet"
        />
        <html lang="en" />
      </Helmet>

      <div className={styles.site}>
        <div className={styles.top}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
        </div>     <User />
        <Menu className={styles.menu} />
        <div className={styles.siteContent}>
          <div className={styles.main}>
            {children}
            <Link className={styles.homepage} to="/">
              Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
