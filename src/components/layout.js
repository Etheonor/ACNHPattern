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
      <div className={styles.container}>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Francois+One&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <div className={styles.top}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
        </div>

        <Menu className={styles.menu} />

        <div className={styles.main}>
          <div>
            <main>{children}</main>
            <Link className={styles.homepage} to="/">
              Homepage
            </Link>
          </div>
        </div>
        <footer className={styles.bottom}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
