import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from '../components/displayPatterns'

const Walls = () => (
  <Layout>
    <SEO title="Walls patterns" />
    <DisplayPatterns category='Wall'/>
  </Layout>
);

export default Walls;
