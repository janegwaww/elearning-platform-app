import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Series from "../components/Home/Series";
import Container from "../components/Container/KeContainer";

export default class SeriesPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`Series | ${config.siteTitle}`} />
          <Container>
            <Series {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}
