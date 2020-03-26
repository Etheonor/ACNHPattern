import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import petimg from './../images/pets.png'

const CutePets = () => (
  <Layout>
    <SEO title="Cute Pets" />
    <h1>Cute Pets</h1>
    <p>Welcome to Cute Pets</p>
    <img src={petimg} alt='cute pets'/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default CutePets
