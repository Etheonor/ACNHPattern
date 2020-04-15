import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";

const Paths = () => (
  <Layout>
    <SEO title="Paths patterns" />
    <h2 className={styles.pageTitle}>Paths</h2>
    <DisplayPatterns category="Path" />
  </Layout>
);

export default Paths;
