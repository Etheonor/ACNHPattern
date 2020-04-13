import React from "react";
import Layout from "./layout";
import { graphql } from "gatsby";
import SearchDesigner from "./searchDesigner";
import styles from "./creatorPages.module.scss";

export default ({ data }) => {
  const elements = data.allSitePage.edges[0].node.context;

  return (
    <Layout>
      <h2>{elements.user}</h2>
      {elements.kofi && (
        <div className={styles.kofi}>
          <a href={`https://ko-fi.com/${elements.kofi}`}>
            Want to support this creator on Ko-fi? Click here!
          </a>
        </div>
      )}
      <SearchDesigner creator={elements.user} />
    </Layout>
  );
};

export const query = graphql`
  query($path: String!) {
    allSitePage(filter: { path: { eq: $path } }) {
      edges {
        node {
          context {
            user
            kofi
          }
        }
      }
    }
  }
`;
