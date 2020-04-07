import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from '../components/displayPatterns'
import styles from "./pages.module.scss";

const Walls = () => (
  <Layout>
    <SEO title="Walls patterns" />
    <h2 className={styles.pageTitle}>Walls</h2>
    <DisplayPatterns category='Wall'/>
  </Layout>
);

export default Walls;
