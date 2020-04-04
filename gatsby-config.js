module.exports = {
  siteMetadata: {
    title: `ACNH Pattern`,
    description: `Find cool pattern for Animal Crossing`,
    author: `@mbreyton`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 400,
              linkImagesToOriginal: false,
              disableBgImage: true,
            },
          },
        ],
        defaultLayouts: {
          default: require.resolve(`./src/components/layout.js`),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-162014227-1`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ACNH Pattern`,
        short_name: `ACNH Pattern`,
        start_url: `/`,
        background_color: `rgb(29, 161, 242)`,
        theme_color: `rgb(29, 161, 242)`,
        display: `minimal-ui`,
        icon: `src/images/AC/tree.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})