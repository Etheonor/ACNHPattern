import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <h1>Contact page</h1>
    <p>
      Want to contact me about the website? You have an idea that will
      greatly improve #ACNH Pattern? Please feel free to contact me with this
      form!
    </p>
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
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
          Message:{" "}
          <textarea
            name="message"
            style={{ width: "250px", height: "150px" }}
          />
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </Layout>
);

export default Contact;
