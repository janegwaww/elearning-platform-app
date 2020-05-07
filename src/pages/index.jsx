import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import KEFormModal from "../components/KEFormKit/KEFormModal";

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container" style={{ width: "100%" }}>
          <Helmet title={`Home | ${config.siteTitle}`} />
          <div>
            <div>home</div>
            <KEFormModal />
          </div>
        </div>
      </Layout>
    );
  }
}
