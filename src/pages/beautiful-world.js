import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import worldimg from './../images/world.png'

const BeautifulWorld = () => (
  <Layout>
    <SEO title="Beautiful World" />
    <h1>Beautiful World</h1>
    <p>Welcome to Beautiful World</p>
    <img src={worldimg} alt='Beautiful World'/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default BeautifulWorld
