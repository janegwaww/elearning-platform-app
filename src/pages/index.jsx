import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Home from "../components/Home/Home";
import Banner from "../components/Home/Banner";
import Container from "../components/Container/KeContainer";

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container" style={{ width: "100%" }}>
          <Helmet title={`Home | ${config.siteTitle}`} />
          <Banner />
          <Container>
            <Home {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}
