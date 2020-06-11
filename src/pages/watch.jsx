import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import Watch from "../components/Watch/Watch";
import config from "../../data/SiteConfig";
import { getIdFromHref } from "../services/utils";

class WatchPage extends Component {
  render() {
    const { vid } = getIdFromHref();

    return (
      <Layout>
        <Helmet title={`Watch | ${config.siteTitle}`} />
        <Container fixed>
          <Watch vid={vid} />
        </Container>
      </Layout>
    );
  }
}

export default WatchPage;
