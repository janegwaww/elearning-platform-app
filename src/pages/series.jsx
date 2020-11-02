import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../static/site-data/SiteConfig";
import Container from "../components/Container/KeContainer";
import Series from "../components/Series/Series";

export default class SeriesPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`Series | ${config.siteTitle}`} />
          <Container>
            <Series />
          </Container>
        </div>
      </Layout>
    );
  }
}
