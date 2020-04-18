import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";

import { firebase } from "../API/Firebase";
const db = firebase.firestore();

const collection = db
  .collection("UserPatterns")
  .where("patternCat", "array-contains", "Sign")
  .orderBy("likeCount", "desc");

const Signs = () => (
  <Layout>
    <SEO title="Signs patterns" />
    <h2 className={styles.pageTitle}>Signs</h2>
    <DisplayPatterns collection={collection} />
  </Layout>
);

export default Signs;
