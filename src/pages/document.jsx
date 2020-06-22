import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import Document from "../components/Document/Document";
import config from "../../data/SiteConfig";
import { getIdFromHref } from "../services/utils";

class DocumentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      did: ""
    };
  }

  componentDidMount() {
    this.verifyId();
  }

  verifyId = () => {
    const { did } = getIdFromHref();
    if (!did) {
      alert("查看的课件不存在...");
    }
    this.setState({ did });
  };

  render() {
    const { did } = this.state;

    return (
      <Layout>
        <div
          className="subscription-container"
          style={{ width: "100%", backgroundColor: "#f2f2f5" }}
        >
          <Helmet title={`document | ${config.siteTitle}`} />
          <Container fixed>
            <Document did={did} {...this.props} />
          </Container>
        </div>
      </Layout>
    );
  }
}

export default DocumentPage;
