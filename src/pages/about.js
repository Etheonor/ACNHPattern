import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./pages.module.scss";

const About = () => (
  <Layout>
    <SEO title="About ACNH Pattern" />
    <div className={styles.Page}>
      <h1>About</h1>
      <h2>What is #ACNH Pattern ?</h2>
      <p>
        #ACNH Pattern is a website where you can share and find cool patterns
        for you favorite game, Animal Crossing: New Horizons!
      </p>
      <h2>Why did you build this website?</h2>
      <p>
        I was amazed by all the incredible content I saw on Twitter, but I was
        also bummed because all of this great content was lost a few hours after
        it was send... I wanted a place where everyone can share their work in a
        more structured way.{" "}
      </p>
      <h2>How do I make a Creator page?</h2>
      <p>Just upload a design! Your creator page will be generated automatically based on your ANCH creator code: </p>
      <p>
        You can find your personal page at:
        https://www.acnhpattern.com/[YOURCREATORCODE]
      </p>
      <p>
        Please note that this is not instant, and creator pages are built every
        12 to 24 hours.
      </p>
      <div className={styles.donors}>
        <h3>
          <span role="img" aria-label="star">
            🌟{" "}
          </span>
          Bonus for donors
        </h3>
        <p>
          If you make a donation to the ACNH Pattern site, first of all, thank you for your support! As a special bonus, donors can have a custom page title and add a{" "}
          <a href="https://ko-fi.com">Ko-fi </a>link on your creator page and
          allow your fans to support your work directly! Feel free to contact me on{" "}
          <a href="https://twitter.com/RoadtoIndie">Twitter </a>
          and we'll add this button!
        </p>
      </div>
      <h2>How did you build it?</h2>
      <p>
        With great software! I'm new to web development and I wanted to improve
        my skills by building something fun, and something that I liked. I used{" "}
        <a href="https://www.gatsbyjs.org/">GatsbyJS</a>, a cool framework based
        on React that let you build fast modern static websites{" "}
      </p>
      <p>
        I also used <a href="https://firebase.google.com/">Firebase</a> for the
        database and the authentication system, and it was a breeze, especially for someone
        who was afraid of all the server side stuff of a website.
      </p>
    </div>
  </Layout>
);

export default About;
