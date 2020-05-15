import React, { Component } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import Button from "@material-ui/core/Button";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import KEFormModal from "../components/KEFormKit/KEFormModal";

export default class HomePage extends Component {
  handleClick = () => {
    let vid = "d2d78c2831cd27b8054005c3c7fc6355";
    navigate(`/watch?vid=${vid}`);
  };
  render() {
    return (
      <Layout>
        <div className="home-container" style={{ width: "100%" }}>
          <Helmet title={`Home | ${config.siteTitle}`} />
          <div>
            <div>home</div>
            <KEFormModal />
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClick}
            >
              播放
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}
