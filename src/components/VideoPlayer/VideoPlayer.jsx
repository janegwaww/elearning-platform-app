import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";
import VideoWindow from "./VideoWindow";
import VideoSearchWrap from "./VideoSearchWrap";
import { videoPath } from "../../services/video";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: {},
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.vid !== prevProps.vid) {
      this.fetchVideo(this.props.vid);
    }
  }

  fetchVideo = vid => {
    this.setState({ loading: true });
    videoPath({ video_id: vid }).then(data => {
      this.setState({ videoInfo: data, loading: false });
      this.props.handleVideoInfo(data.data);
    });
  };

  render() {
    const { videoInfo, loading } = this.state;

    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom>
            {videoInfo && videoInfo.title}
          </Typography>
        </div>
        <VideoSearchWrap vid={this.props.vid}>
          {timer => (
            <VideoWindow info={videoInfo} timer={timer} loading={loading} />
          )}
        </VideoSearchWrap>
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired
};

export default VideoPlayer;
