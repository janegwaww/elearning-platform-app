import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import HomeTab from "../Home/HomeTab";
import GridCards from "../Home/GridCards";

export default class CreatorHome extends Component {
  render() {
    return (
      <Layout>
        <div className="Creator-container" style={{ width: "100%" }}>
          <Helmet title={`Creator | ${config.siteTitle}`} />
          <Container fixed>
            <div>
              <div style={{ height: 400, backgroundColor: "#ddd" }}>banner</div>
              <HomeTab
                tabs={[
                  {
                    label: "上传的作品",
                    tabContent: () => (
                      <div style={{}}>
                        <GridCards itemCount={16} loading={true} />
                        <br />
                        <Pagination
                          count={10}
                          variant="outlined"
                          shape="rounded"
                          style={{ backgroundColor: "#fff" }}
                        />
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
