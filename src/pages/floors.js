import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from "../components/displayPatterns";
import styles from "./pages.module.scss";
import { firebase } from "../API/Firebase";
const db = firebase.firestore();

const collection = db
  .collection("UserPatterns")
  .where("patternCat", "array-contains", "Floor")
  .orderBy("likeCount", "desc");

const Floors = () => (
  <Layout>
    <SEO title="Floors patterns" />
    <h2 className={styles.pageTitle}>Floors</h2>
    <DisplayPatterns collection={collection} />
  </Layout>
);

export default Floors;
