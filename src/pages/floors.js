import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from '../components/displayPatterns'
import styles from "./pages.module.scss";

const Floors = () => (
  <Layout>
    <SEO title="Floors patterns" />
    <h2 className={styles.pageTitle}>Floors</h2>
    <DisplayPatterns category='Floor'/>
  </Layout>
);

export default Floors;
