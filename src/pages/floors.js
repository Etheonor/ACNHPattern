import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import DisplayPatterns from '../components/displayPatterns'

const Floors = () => (
  <Layout>
    <SEO title="Floors patterns" />
    <DisplayPatterns category='Floor'/>
  </Layout>
);

export default Floors;
