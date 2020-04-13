import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";

const Clothing = () => (
  <Layout>
    <SEO title="Clothing patterns" />
    <h2 className={styles.pageTitle}>Clothing</h2>
    <DisplayPatterns category="Cloth" />
  </Layout>
);

export default Clothing;
