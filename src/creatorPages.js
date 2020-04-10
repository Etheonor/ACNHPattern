import React from "react";
import Layout from "./components/layout";
import { graphql } from "gatsby";

export default ({ data }) => {
  const test = data.allSitePage.edges[0].node.context;
  return (
    <Layout>
      <h1>{test.user}</h1>
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
          }
        }
      }
    }
  }
`;
