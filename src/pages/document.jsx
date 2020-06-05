import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";

export default class SeriesPage extends Component {
  render() {
    return (
      <Layout>
        <div
          className="subscription-container"
          style={{ width: "100%", backgroundColor: "#bdc3c7" }}
        >
          <Helmet title={`document | ${config.siteTitle}`} />
          <Container fixed>{/* <Documento {...this.props} /> */}</Container>
        </div>
      </Layout>
    );
  }
}
