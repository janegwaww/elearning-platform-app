import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";

export default class SeriesPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`series | ${config.siteTitle}`} />
          <Container fixed>series</Container>
        </div>
      </Layout>
    );
  }
}
