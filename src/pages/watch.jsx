import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import Watch from "../components/Watch/Watch";
import config from "../../data/SiteConfig";

class WatchPage extends Component {
  render() {
    const { location = {} } = this.props;
    const { state = {} } = location;

    return (
      <Layout>
        <Helmet title={`Watch | ${config.siteTitle}`} />
        <Container fixed>
          <Watch vid={state && state.vid} />
        </Container>
      </Layout>
    );
  }
}

export default WatchPage;
