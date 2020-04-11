import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./pages.module.scss";

const About = () => (
  <Layout>
    <SEO title="About ACNH Pattern" />
    <div className={styles.Page}>
      <h1>About #ACNH Pattern</h1>
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
      <h2>Can I have a Creator page?</h2>
      <p>You already have! </p>
      <p>
        If you uploaded a design with your creator code, your personnal page is
        https://www.acnhpattern.com/[YOURCREATORCODE]
      </p>
      <h2>How did you build it?</h2>
      <p>
        With great softwares! I'm new in web development and I wanted to improve
        my skills by building something fun, something I liked. I used{" "}
        <a href="https://www.gatsbyjs.org/">GatsbyJS</a>, a cool framework based
        on React that let you build fast modern static websites{" "}
      </p>
      <p>
        I also used <a href="https://firebase.google.com/">Firebase</a> for the
        database and the authentication system, and it was a breeze for someone
        who was afraid by all the server side of a website.
      </p>
    </div>
  </Layout>
);

export default About;
