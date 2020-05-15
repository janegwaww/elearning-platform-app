import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerRef = React.createRef(null);
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer, "seconds");
    }
  }

  render() {
    const { info } = this.props;
    return (
      <ReactPlayer
        ref={this.playerRef}
        url={info.videoPath}
        width="100%"
        height="100%"
        controls
        config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: info.assPath,
                srcLand: "cn",
                default: true
              }
            ]
          }
        }}
      />
    );
  }
}

VideoWindow.defaultProps = {
  timer: 0
};

VideoWindow.propTypes = {
  info: PropTypes.object.isRequired,
  timer: PropTypes.number
};

export default VideoWindow;
