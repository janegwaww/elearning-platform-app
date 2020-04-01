import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container" style={{ width: "100%" }}>
          <Helmet title={`Home | ${config.siteTitle}`} />
          <div>
            <div>home</div>
          </div>
        </div>
      </Layout>
    );
  }
}
