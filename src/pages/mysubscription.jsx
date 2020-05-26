import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Home from "../components/Home/Home";

export default class MySubscriptionPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`Subscription | ${config.siteTitle}`} />
          <div style={{ backgroundColor: "#ddd", height: 480 }}>bar</div>
          <Container fixed>
            <Home />
          </Container>
          <div style={{ backgroundColor: "#ddd", height: 500 }}>bar</div>
        </div>
      </Layout>
    );
  }
}
