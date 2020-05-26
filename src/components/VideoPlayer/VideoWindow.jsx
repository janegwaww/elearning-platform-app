import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "400px"
    };
    this.playerRef = React.createRef(null);
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer, "seconds");
    }
  }

  imagePath = path => `http://api.haetek.com:9191/${path}`;

  render() {
    const { info } = this.props;
    const { height } = this.state;

    return (
      <ReactPlayer
        ref={this.playerRef}
        url={info.videoPath}
        light={this.imagePath(info.imagePath)}
        width="100%"
        height={height}
        controls
        playbackRate={1}
        onStart={() => this.setState({ height: "100%" })}
        config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: info.assPath,
                srcland: "cn",
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
