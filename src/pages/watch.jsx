import React, { Component } from "react";
import Helmet from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Watch from "../components/Watch/Watch";

class WatchPage extends Component {
  render() {
    return (
      <Layout>
        <CssBaseline />
        <Helmet title={`Watch | ${config.siteTitle}`} />
        <Container fixed>
          <Watch />
        </Container>
      </Layout>
    );
  }
}

export default WatchPage;
