import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import MySubscription from "../components/Home/MySubscription";

export default class MySubscriptionPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`Subscription | ${config.siteTitle}`} />
          <Container fixed>
            <MySubscription />
          </Container>
        </div>
      </Layout>
    );
  }
}
