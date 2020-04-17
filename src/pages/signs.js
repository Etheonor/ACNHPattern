import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";

const Signs = () => (
  <Layout>
    <SEO title="Signs patterns" />
    <h2 className={styles.pageTitle}>Signs</h2>
    <DisplayPatterns category="Sign" />
  </Layout>
);

export default Signs;
