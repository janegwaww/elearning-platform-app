import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Home from "../components/Home/Home";
import Banner from "../components/Home/Banner";
import Container from "../components/Container/KeContainer";

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        <div className="home-container" style={{ width: "100%" }}>
          <Banner data={this.props.data} />
          <Container>
            <Home />
          </Container>
        </div>
      </Layout>
    );
  }
}

export const bannerQuery = graphql`
  query {
    file(relativePath: { eq: "images/zhiqingbei.jpg" }) {
      childImageSharp {
        fixed(width: 3840, height: 960) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
