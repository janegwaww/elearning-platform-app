import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Series from "../components/Home/Series";

export default class SeriesPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`series | ${config.siteTitle}`} />
          <Container fixed>
            <Series {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}
