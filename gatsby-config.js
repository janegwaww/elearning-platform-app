const config = require("./static/site-data/SiteConfig");

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/logo-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logos/logo-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        // baidu analytics siteId
        siteId: "b88346942d0f4074f2a16c0cfda3b856",
        // Put analytics script in the head instead of the body [default:false]
        head: false,
      },
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: {
        prefixes: [
          `/users/*`,
          `/excellentcreator/*`,
          `/video/*`,
          `/protocol/*`,
          `/phone/*`,
          `/activity/*`,
        ],
      },
    },
  ],
};
