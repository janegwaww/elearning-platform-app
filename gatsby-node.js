/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
};
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
         
          {
            test: /webuploader/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}