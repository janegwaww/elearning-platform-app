import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
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

  preventDefault = event => event.preventDefault();

  render() {
    const { videoInfo, loading } = this.state;

    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom>
            {videoInfo && videoInfo.title}
          </Typography>
        </div>
        {loading || !videoInfo.videoPath ? (
          <Box
            height={{ xs: 200, sm: 300, md: 400, lg: 460, xl: 500 }}
            bgcolor="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <VideoSearchWrap vid={this.props.vid}>
            {timer => <VideoWindow info={videoInfo} timer={timer} />}
          </VideoSearchWrap>
        )}
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired
};

export default VideoPlayer;
