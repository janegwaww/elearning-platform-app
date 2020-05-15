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
      videoInfo: {}
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.vid !== prevProps.vid) {
      this.fetchVideo(this.props.vid);
    }
  }

  fetchVideo = vid => {
    videoPath(vid).then(data => {
      console.log(data);
      this.setState({ videoInfo: data });
    });
  };

  render() {
    const { videoInfo } = this.state;

    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom>
            {videoInfo && videoInfo.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            来自频道<Link color="secondary">{videoInfo.authName}</Link>
          </Typography>
        </div>
        <VideoSearchWrap>
          {timer => <VideoWindow info={videoInfo} timer={timer} />}
        </VideoSearchWrap>
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired
};

export default VideoPlayer;
