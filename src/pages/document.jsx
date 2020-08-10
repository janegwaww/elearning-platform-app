import React, { Component } from "react";
import Layout from "../layout";
import Document from "../components/Document/Document";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import {settings_html} from '../assets/js/totls';
class DocumentPage extends Component {
  componentDidMount() {
    settings_html();
   
  }
  render() {
    return (
      <Layout>
        <div
          className="subscription-container"
          style={{ width: "100%", backgroundColor: "#f2f2f5" }}
        >
          <Helmet title={`Document | ${config.siteTitle}`}>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Helmet>
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
