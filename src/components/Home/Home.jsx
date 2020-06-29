import React, { Component, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";
import ChannelBar from "./ChannelBar";
import { getHotVideos } from "../../services/home";
import Pagination from "../Pagination/Pagination";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchHotVideo({});
  }

  fetchHotVideo = ({ page = 1 }, callback = () => ({})) => {
    this.setState({ loading: true });
    getHotVideos({ max_size: 16, page }).then((data) => {
      this.setState({ hotVideos: data });
      this.setState({ loading: false });
      callback(data);
    });
  };

  render() {
    const { hotVideos, loading } = this.state;

    return (
      <Fragment>
        <ChannelBar id="hots" />
        <br />
        <div style={{ minHeight: "50vh" }}>
          <GridCards loading={loading} itemCount={16} items={hotVideos} />
        </div>
        <br />
        <Pagination fetch={this.fetchHotVideo} />
        <br />
      </Fragment>
    );
  }
}

export default Home;
