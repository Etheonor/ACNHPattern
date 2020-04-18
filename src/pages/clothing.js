import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";
import { firebase } from "../API/Firebase";
const db = firebase.firestore();

const collection = db
  .collection("UserPatterns")
  .where("patternCat", "array-contains", "Cloth")
  .orderBy("likeCount", "desc");

const Clothing = () => (
  <Layout>
    <SEO title="Clothing patterns" />
    <h2 className={styles.pageTitle}>Clothing</h2>
    <DisplayPatterns collection={collection} />
  </Layout>
);

export default Clothing;
