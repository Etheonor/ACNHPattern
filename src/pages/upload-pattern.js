import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import UploadDesign from '../components/uploadDesign'

const UploadPattern = () => (
  <Layout>
    <SEO title="Upload a new pattern" />
    <UploadDesign/>
  </Layout>
);

export default UploadPattern;
