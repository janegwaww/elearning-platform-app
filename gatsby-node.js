/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
};
exports.onCreateWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
      const timestamp = Date.now();
      config.merge({
          devtool: false,
          output: {
              filename: `name-${timestamp}-[chunkhash].js`,
              chunkFilename: `name-${timestamp}-[chunkhash].js`
          }
      });
  }
  return config;
};
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /reactjs-pdf-reader/,
            use: loaders.null(),
          },
          {
            test: /react-zmage/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
