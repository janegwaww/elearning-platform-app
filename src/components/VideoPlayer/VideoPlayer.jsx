import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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
    this.fetchVideo = this.fetchVideo.bind(this);
  }

  componentDidMount() {
    this.props.vid && this.fetchVideo(this.props.vid);
  }

  fetchVideo(vid) {
    this.setState({ loading: true });
    videoPath({ video_id: vid }).then((data) => {
      this.setState({ videoInfo: data, loading: false });
      this.props.handleVideoInfo(data.data);
    });
  }

  render() {
    const { videoInfo, loading } = this.state;

    return (
      <Fragment>
        <VideoWindow
          info={videoInfo}
          loading={loading}
          ref={this.videoWindowRef}
        />
        <UseSetSEO info={videoInfo} />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  vid: PropTypes.string.isRequired,
};

export default VideoPlayer;
