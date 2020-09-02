/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ actions: { createPage } }) => {
  const simplePages = require("./src/components/Simple/helmetInfo.json");

  simplePages.forEach((item, i) => {
    createPage({
      path: `/seopages/simple${i}`,
      component: require.resolve("./src/components/Simple/SimplePage.jsx"),
      context: { item },
    });
  });
};
