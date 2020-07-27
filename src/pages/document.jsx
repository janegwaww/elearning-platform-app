import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Document from "../components/Document/Document";
import config from "../../data/SiteConfig";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";

class DocumentPage extends Component {
  render() {
    return (
      <Layout>
        <div
          className="subscription-container"
          style={{ width: "100%", backgroundColor: "#f2f2f5" }}
        >
          <Helmet title={`Document | ${config.siteTitle}`} />
          <LoginConfirmProvider>
            <Container>
              <Document />
            </Container>
          </LoginConfirmProvider>
        </div>
      </Layout>
    );
  }
}

export default DocumentPage;
