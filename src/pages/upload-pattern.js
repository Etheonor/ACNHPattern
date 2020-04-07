import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import UploadPattern from '../components/uploadPattern'

const UploadPatternPage = () => (
  <Layout>
    <SEO title="Upload a new pattern" />
    <UploadPattern/>
  </Layout>
);

export default UploadPatternPage;
