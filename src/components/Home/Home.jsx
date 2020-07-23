import React, { Component, Fragment } from "react";
import GridCards from "../GridCards/GridCards";
import ChannelBar from "./ChannelBar";
import { getHotVideos } from "../../services/home";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ChangeBatchButton from "./ChangeBatchButton";
import Tabs from "../Tabs/Tabs";
import ProgressBar from "../Loading/ProgressBar";
import { navigate } from "@reach/router";

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
    this.fetchHotVideo();
  }

  fetchHotVideo = ({ page = 1 } = {}, callback = () => ({})) => {
    const { type } = this.state;
    this.setState({ loading: true });
    getHotVideos({ max_size: 24, page, type }).then((data) => {
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

  handleChange = () => {
    navigate("/");
    this.fetchHotVideo();
  };

  render() {
    const { hotVideos, loading } = this.state;

    return (
      <Fragment>
        <ChannelBar id="hots" />
        <Tabs handleTab={this.handleTab} />
        <br />
        <div style={{ minHeight: "50vh" }}>
          <GridCards loading={loading} itemCount={24} items={hotVideos} />
          <EmptyNotice
            empty={!hotVideos.length && !loading}
            type="noResult"
            handleFresh={this.fetchHotVideo}
          />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <ChangeBatchButton handleChange={this.handleChange} />
        </div>
        <br />
        <ProgressBar loading={loading} />
      </Fragment>
    );
  }
}

export default Home;
