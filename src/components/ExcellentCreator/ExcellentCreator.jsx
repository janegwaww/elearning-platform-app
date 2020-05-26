import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Container from "@material-ui/core/Container";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import Home from "../Home/Home";

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="ExcellentCreator-container" style={{ width: "100%" }}>
          <Helmet title={`Excellent | ${config.siteTitle}`} />
          <div style={{ backgroundColor: "#ddd", height: 480 }}>bar</div>
          <Container fixed>
            <Home />
            <Link to="/excellentcreator/creator">creator</Link>
          </Container>
          <div style={{ backgroundColor: "#ddd", height: 500 }}>bar</div>
        </div>
      </Layout>
    );
  }
}
