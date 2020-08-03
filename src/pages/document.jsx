import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Document from "../components/Document/Document";
import config from "../../data/SiteConfig";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";


class DocumentPage extends Component {
  componentDidMount() {
    let _w = window.screen.width;
    let _new_w = (16 / 1920) * _w;
    document.querySelector("html").style.fontSize = _new_w + "px";
    console.log(_w);
    alert(_new_w)
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
