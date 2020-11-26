/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devServer: {
      watchOptions: {
        ignored: [/\.#|node_modules|~$/],
      },
    },
  });
};
