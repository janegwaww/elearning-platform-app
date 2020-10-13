/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const simplePages = require("./src/components/Simple/helmetInfo.json");
  simplePages.forEach((item, i) => {
    createPage({
      path: `/seopages/simple${i}`,
      component: require.resolve("./src/components/Simple/SimplePage.jsx"),
      context: { item },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-zmage/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
