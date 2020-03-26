import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import petimg from './../images/pets.png';

const Contact = () => (
	<Layout>
		<SEO title="Contact" />
		<h1>Contact page</h1>
        <p>You want more information about Sweetter ? Please feel free to contact me with this form!</p>
		<form name="contact" method="POST" netlify  data-netlify-recaptcha="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
			<p>
				<label>
					Your Name: <input type="text" name="name" />
				</label>
			</p>
			<p>
				<label>
					Your Email: <input type="email" name="email" />
				</label>
			</p>
			<p>
				<label>
					Message: <textarea name="message" />
				</label>
			</p>
			<p>
				<button type="submit">Send</button>
			</p>
		</form>

		<img src={petimg} alt="cute pets" />
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default Contact;
