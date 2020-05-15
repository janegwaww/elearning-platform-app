import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";
import KEFormModal from "../components/KEFormKit/KEFormModal";

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`About | ${config.siteTitle}`} />
          
          <About />
          <KEFormModal />
        </div>
      </Layout>
    );
  }
}
export default AboutPage;

