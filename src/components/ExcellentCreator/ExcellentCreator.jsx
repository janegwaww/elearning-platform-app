import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Container from "@material-ui/core/Container";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import HomeTab from "../Home/HomeTab";

export default class ExcellentCreator extends Component {
  render() {
    return (
      <Layout>
        <div className="ExcellentCreator-container" style={{ width: "100%" }}>
          <Helmet title={`Excellent | ${config.siteTitle}`} />
          <Container fixed>
            <div>
              <HomeTab
                tabs={[
                  {
                    label: "优秀创作者",
                    tabContent: () => (
                      <div style={{ height: 900 }}>
                        <Link to="/excellentcreator/creator">creator</Link>
                      </div>
                    )
                  }
                ]}
              />
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}
