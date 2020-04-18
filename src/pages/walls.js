import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from '../components/displayPatterns'
import styles from "./pages.module.scss";
import { firebase } from "../API/Firebase";
const db = firebase.firestore();

const collection = db
  .collection("UserPatterns")
  .where("patternCat", "array-contains", "Wall")
  .orderBy("likeCount", "desc");

const Walls = () => (
  <Layout>
    <SEO title="Walls patterns" />
    <h2 className={styles.pageTitle}>Walls</h2>
    <DisplayPatterns collection={collection}/>
  </Layout>
);

export default Walls;
