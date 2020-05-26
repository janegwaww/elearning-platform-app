import React, { Component, Fragment } from "react";
import { getHotVideos, getLatestSubscription } from "../../services/home";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      latestSub: []
    };
  }

  componentDidMount() {
    this.fetchHotVideo();
    this.fetchLatestSub();
  }

  fetchHotVideo = () => {
    getHotVideos({ max_size: 8, page: 1 }).then(data =>
      this.setState({ hotVideos: data })
    );
  };

  fetchLatestSub = () => {
    getLatestSubscription({ type: "web" });
  };

  render() {
    const { hotVideos, latestSub } = this.state;

    return (
      <Fragment>
        <div style={{ backgroundColor: "#333", height: 400 }}>
          {latestSub.map((o, i) => (
            <div>{o.title}</div>
          ))}
        </div>
        <div style={{ backgroundColor: "#666", height: 600 }}>
          {hotVideos.map((o, i) => (
            <div>{o.title}</div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Home;
