import React from "react";
import Layout from "./components/layout";
import { graphql } from "gatsby";
import SearchDesigner from './components/searchDesigner'

export default ({ data }) => {
  const elements = data.allSitePage.edges[0].node.context;
  return (
    <Layout>
      <h1>{elements.user}</h1>
      <SearchDesigner creator={elements.user}/>
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
