import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";
import VideoWindow from "./VideoWindow";
import VideoSearchWrap from "./VideoSearchWrap";
import UseSetSEO from "./UseSetSEO";
import { videoPath } from "../../services/video";
import { secondsToHMS } from "../../services/utils";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: {},
      loading: false,
    };
    this.videoWindowRef = React.createRef();
  }

  componentDidMount() {
    this.props.vid && this.fetchVideo(this.props.vid);
  }

  fetchVideo = (vid) => {
    this.setState({ loading: true });
    videoPath({ video_id: vid }).then((data) => {
      this.setState({ videoInfo: data, loading: false });
      this.props.handleVideoInfo(data.data);
    });
  };

  render() {
    const { videoInfo, loading } = this.state;
    console.log(videoInfo)
    return (
      <Fragment>
        <div style={{ paddingTop: "0.35em" }}>
          <Typography variant="h6" gutterBottom noWrap>
            {videoInfo && videoInfo.title}
          </Typography>
        </div>
        <VideoSearchWrap vid={this.props.vid} path={videoInfo.vttPath}>
          {(timer) => (
            <VideoWindow
              info={videoInfo}
              timer={timer}
              loading={loading}
              ref={this.videoWindowRef}
            />
          )}
        </VideoSearchWrap>
        <UseSetSEO info={videoInfo} />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired,
};

export default VideoPlayer;
