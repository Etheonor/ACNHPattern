import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import User from '../components/user'

const Login = () => (
  <Layout>
    <SEO title="Sweetter Login" />
    <User/>
  </Layout>
);

export default Login;