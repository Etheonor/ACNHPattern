/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./structuralComponents/header";
import Footer from "./structuralComponents/footer";
import styles from "./layout.module.scss";
import Helmet from "react-helmet";

import PageSubtitle from "./structuralComponents/pageSubtitle";

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
      <ToastContainer />
      <div className={styles.site}>
        <div className={styles.top}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
        </div>

        <div className={styles.siteContent}>
          <PageSubtitle />
          
          <div className={styles.main}>{children}</div>
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
