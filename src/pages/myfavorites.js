import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import MyPageComp from "../components/myPage";

const MyFavorites = () => (
  <Layout>
    <SEO title="My Page" />
    <MyPageComp />
  </Layout>
);

export default MyFavorites;
