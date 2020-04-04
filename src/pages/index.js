import React from "react";

import Layout from "../components/layout";
import Image from "../components/structuralComponents/image";
import SEO from "../components/seo";
import CategoryGrid from '../components/categoryGrid'
import UploadButton from '../components/buttons/uploadButton'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CategoryGrid />
    <UploadButton/>
  </Layout>
);

export default IndexPage;
