import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Layout from "../../layout";
import config from "../../../static/site-data/SiteConfig";
import HomeTab from "../Home/HomeTab";
import CreatorBar from "../Home/CreatorBar";
import { getHotAuths } from "../../services/home";
import Container from "../Container/KeContainer";

export default class ExcellentCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAuthData();
  }

  fetchAuthData = () => {
    this.setState({ loading: true });
    getHotAuths({ max_size: 5, page: 1, video_size: 4 }).then((data) => {
      this.setState({ authList: data, loading: false });
    });
  };

  render() {
    const { authList, loading } = this.state;

    return (
      <Layout>
        <div className="ExcellentCreator-container" style={{ width: "100%" }}>
          <Helmet title={`Excellent | ${config.siteTitle}`} />
          <Container>
            <div>
              <HomeTab
                tabs={[
                  {
                    label: "优秀创作者",
                    tabContent: () => (
                      <div style={{ height: 1000 }}>
                        {authList.map((o, i) => (
                          <CreatorBar info={o} key={i} loading={loading} />
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}
