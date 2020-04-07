import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";

const Cloth = () => (
  <Layout>
    <SEO title="Cloth patterns" />
    <h2 className={styles.pageTitle}>Cloth</h2>
    <DisplayPatterns category="Cloth" />
  </Layout>
);

export default Cloth;
