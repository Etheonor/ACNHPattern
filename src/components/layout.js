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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import Header from "./structuralComponents/header";
import Footer from "./structuralComponents/footer";
import styles from "./layout.module.scss";
import Helmet from "react-helmet";

import PageSubtitle from "./structuralComponents/pageSubtitle";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F4C81'
    },
    secondary: {
      main: '#ff331f',
    },
  },
});

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
    <MuiThemeProvider theme={theme}>
      <Helmet>

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
          <div className={styles.main}>{children}</div>
        </div>
        <Footer />
      </div>
      </MuiThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
