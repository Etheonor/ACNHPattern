import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";
import { firebase } from "../API/Firebase";
const db = firebase.firestore();

const collection = db
  .collection("UserPatterns")
  .where("patternCat", "array-contains", "Path")
  .orderBy("likeCount", "desc");

const Paths = () => (
  <Layout>
    <SEO title="Paths patterns" />
    <h2 className={styles.pageTitle}>Paths</h2>
    <DisplayPatterns collection={collection} />
  </Layout>
);

export default Paths;
