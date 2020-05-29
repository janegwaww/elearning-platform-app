import React, { Component, Fragment } from "react";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";
import { getHotVideos, getLatestSubscription } from "../../services/home";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      latestSub: [],
      recommdVideos: [],
      loading1: true,
      loading2: true,
      loading3: true
    };
  }

  componentDidMount() {
    this.fetchHotVideo();
    this.fetchLatestSub();
    /* this.fetchRecommdVideos(); */
  }

  fetchHotVideo = () => {
    getHotVideos({ max_size: 8, page: 1 }).then(data =>
      this.setState({ hotVideos: data, loading2: false })
    );
  };

  fetchLatestSub = () => {
    getLatestSubscription({ type: "web" }).then(data => {
      if (data && data.length > 0) {
        this.setState({ latestSub: data, loading1: false });
      }
    });
  };

  fetchRecommdVideos = () => {
    // 暂时没有接口
    /* getRecommendVideos({}).then(data =>
     *   this.setState({ recommdVideos: data, loading3: false })
     * ); */
  };

  render() {
    const {
      hotVideos,
      latestSub,
      loading1,
      loading2,
      loading3,
      recommdVideos
    } = this.state;

    return (
      <Fragment>
        <div>
          <HomeTab
            tabs={[
              {
                label: "我的订阅",
                tabContent: () => (
                  <GridCards
                    loading={loading1}
                    itemCount={4}
                    items={latestSub}
                  />
                )
              }
            ]}
          />
        </div>
        <br />
        <div>
          <HomeTab
            tabs={[
              // 暂时隐藏
              //             {
              //               label: "为您推荐",
              //               tabContent: () => (
              //                 <GridCards
              //                   loading={loading3}
              //                   itemCount={8}
              //                   items={recommdVideos}
              //                 />
              //               )
              //             },
              {
                label: "热门视频",
                tabContent: () => (
                  <GridCards
                    loading={loading2}
                    itemCount={8}
                    items={hotVideos}
                  />
                )
              }
            ]}
          />
        </div>
        <br />
      </Fragment>
    );
  }
}

export default Home;
