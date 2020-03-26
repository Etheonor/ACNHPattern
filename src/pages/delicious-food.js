import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import foodimg from './../images/food.png'

const DeliciousFood = () => (
  <Layout>
    <SEO title="Delicious Food" />
    <h1>Delicious Food</h1>
    <p>Welcome to Delicious Food</p>
    <img src={foodimg} alt='Delicious Food'/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DeliciousFood
