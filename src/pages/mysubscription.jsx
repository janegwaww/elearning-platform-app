import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../static/site-data/SiteConfig";
import MySubscription from "../components/Home/MySubscription";
import Container from "../components/Container/KeContainer";

export default class MySubscriptionPage extends Component {
  render() {
    return (
      <Layout>
        <div className="subscription-container" style={{ width: "100%" }}>
          <Helmet title={`Subscription | ${config.siteTitle}`} />
          <Container>
            <MySubscription />
          </Container>
        </div>
      </Layout>
    );
  }
}
