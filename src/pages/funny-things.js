import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import funimg from './../images/fun.png';

const FunnyThings = () => (
	<Layout>
		<SEO title="Funny Things" />
		<h1>Funny Things</h1>
		<p>Welcome to Funny Things</p>
		<img src={funimg} alt="Funny Things" />
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default FunnyThings;
