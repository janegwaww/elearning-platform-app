import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Home from "../components/Home/Home";

export default class ChannelPage extends Component {
  render() {
    return (
      <Layout>
        <div className="channel-container" style={{ width: "100%" }}>
          <Helmet title={`Channel | ${config.siteTitle}`} />
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
