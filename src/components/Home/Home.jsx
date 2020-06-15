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
      loading: true
    };
  }

  componentDidMount() {
    this.fetchHotVideo();
  }

  fetchHotVideo = () => {
    this.setState({ loading: true });
    getHotVideos({ max_size: 16, page: 1 }).then(data =>
      this.setState({
        hotVideos: data,
        loading: false
      })
    );
  };

  render() {
    const { hotVideos, loading } = this.state;

    return (
      <Fragment>
        <ChannelBar index="000" />
        <br />
        <div style={{ minHeight: "90vh" }}>
          <GridCards
            loading={loading}
            itemCount={hotVideos.length}
            items={hotVideos}
          />
        </div>
        <br />
        <br />
      </Fragment>
    );
  }
}

export default Home;
