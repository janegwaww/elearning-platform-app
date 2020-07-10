import React, { Component, Fragment } from "react";
import GridCards from "../GridCards/GridCards";
import ChannelBar from "./ChannelBar";
import { getHotVideos } from "../../services/home";
import Pagination from "../Pagination/Pagination";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ChangeBatchButton from "./ChangeBatchButton";
import Tabs from "../Tabs/Tabs";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      loading: true,
      type: "all",
    };
  }

  componentDidMount() {
    /* this.fetchHotVideo({}); */
  }

  fetchHotVideo = ({ page = 1 } = {}, callback = () => ({})) => {
    const { type } = this.state;
    this.setState({ loading: true });
    getHotVideos({ max_size: 16, page, type }).then((data) => {
      this.setState({ hotVideos: data });
      this.setState({ loading: false });
      callback(data);
    });
  };

  handleTab = (type) => {
    this.setState({ type }, () => {
      this.fetchHotVideo({});
    });
  };

  render() {
    const { hotVideos, loading } = this.state;

    return (
      <Fragment>
        <ChannelBar id="hots" />
        <Tabs handleTab={this.handleTab} />
        <br />
        <div style={{ minHeight: "50vh" }}>
          <GridCards loading={loading} itemCount={16} items={hotVideos} />
          <EmptyNotice empty={!hotVideos.length && !loading} />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <ChangeBatchButton handleChange={this.fetchHotVideo} />
        </div>
        <div style={{ display: "none" }}>
          <Pagination fetch={this.fetchHotVideo} />
        </div>
        <br />
      </Fragment>
    );
  }
}

export default Home;
