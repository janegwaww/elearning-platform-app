import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";
import SingleLineGridList from "./SingleLineGridList";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: ""
    };
  }

  componentDidMount() {
    const { vid } = this.props;
    this.setId(vid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.vid !== prevProps.vid) {
      this.fetchVideo(this.props.vid);
    }
  }

  fetchVideo = vid => console.log(vid);

  setId = id => this.setState({ vid: id });

  render() {
    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom>
            C4D修神记：零基础到三维封神。行业名师帮你打基础，拒绝纸上谈兵
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            来自频道<Link>@三维设计</Link>
          </Typography>
        </div>
        <div>
          <video controls width="100%">
            <source
              src="http://videos.haetek.com/sv/41a45e0c-171aa124b85/41a45e0c-171aa124b85.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <SingleLineGridList />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired
};

export default VideoPlayer;
