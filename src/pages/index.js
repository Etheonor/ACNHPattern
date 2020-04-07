import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CategoryGrid from "../components/categoryGrid";

const IndexPage = () => (
  <Layout >
    <SEO title="Home" />
    <CategoryGrid />
  </Layout>
);

export default IndexPage;
