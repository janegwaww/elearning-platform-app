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

  componentDidUpdate(prevProps) {
    if (this.props.vid !== prevProps.vid) {
      this.fetchVideo(this.props.vid);
    }
  }

  fetchVideo = vid =>
    videoPath({ video_id: vid }).then(data => {
      this.setState({ videoInfo: data });
      this.props.handleVideoInfo(data.data);
    });

  preventDefault = event => event.preventDefault();

  render() {
    const { videoInfo } = this.state;

    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom>
            {videoInfo && videoInfo.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            来自频道
            {videoInfo.category &&
              videoInfo.category.map(o => (
                <Link
                  href="#"
                  color="secondary"
                  onClick={this.preventDefault}
                  key={o}
                >
                  {`@${o}`}
                </Link>
              ))}
          </Typography>
        </div>
        <VideoSearchWrap vid={this.props.vid}>
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
