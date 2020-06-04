import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Channel from "../components/Home/Channel";

export default class ChannelPage extends Component {
  render() {
    return (
      <Layout>
        <div className="channel-container" style={{ width: "100%" }}>
          <Helmet title={`Channel | ${config.siteTitle}`} />
          <Container fixed>
            <Channel {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}
