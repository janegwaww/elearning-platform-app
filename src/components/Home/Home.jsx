import React, { Component, Fragment } from "react";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";
import ChannelBar from "./ChannelBar";
import { getHotVideos } from "../../services/home";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      recommdVideos: [],
      loading2: true,
      loading3: true
    };
  }

  componentDidMount() {
    this.fetchHotVideo();
    /* this.fetchRecommdVideos(); */
  }

  fetchHotVideo = () => {
    getHotVideos({ max_size: 16, page: 1 }).then(data =>
      this.setState({ hotVideos: data, loading2: false })
    );
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
      loading2,
      loading3
      /* recommdVideos */
    } = this.state;

    return (
      <Fragment>
        <ChannelBar index="000" />
        <br />
        <div style={{ minHeight: "90vh" }}>
          <GridCards loading={loading2} itemCount={16} items={hotVideos} />
        </div>
        <br />
        <br />
      </Fragment>
    );
  }
}

export default Home;
