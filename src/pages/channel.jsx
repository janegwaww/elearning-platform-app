import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Channel from "../components/Home/Channel";
import Container from "../components/Container/KeContainer";

export default class ChannelPage extends Component {
  render() {
    return (
      <Layout>
        <div className="channel-container" style={{ width: "100%" }}>
          <Helmet title={`Channel | ${config.siteTitle}`} />
          <Container>
            <Channel {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}
