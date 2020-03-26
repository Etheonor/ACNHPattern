import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import lifestyleimg from './../images/lifestyle.png'

const CoolLifestyle = () => (
  <Layout>
    <SEO title="Cool Lifestyle" />
    <h1>Cool Lifestyle</h1>
    <p>Welcome to Cool Lifestyle</p>
    <img src={lifestyleimg} alt='lifestyle'/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default CoolLifestyle
