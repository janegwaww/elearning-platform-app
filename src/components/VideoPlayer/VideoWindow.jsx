import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
/* import ass from "assjs"; */
import "../VideoPlayer/VideoWindow.sass";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "400px"
    };
    this.playerRef = React.createRef(null);
  }

  wrapPath = path => `http://api.haetek.com:9191/${path}`;

  fetchVideoSubtitle = () => {
    const { info = {} } = this.props;
    const { vttPath } = info;
    fetch(
      `${this.wrapPath("static/videos/5c82d69504419c65f4aec21db403e904.ass")}`
    )
      .then(res => res.text())
      .then(text => {
        /* setTimeout(() => {
         *   new ass(
         *     text,
         *     document
         *       .getElementById("kengine-video-player")
         *       .getElementsByTagName("video")[0]
         *   );
         * }, 1000); */
      });
  };

  componentDidMount() {
    /* this.fetchVideoSubtitle(); */
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer, "seconds");
    }
  }

  render() {
    const { info } = this.props;
    const { height } = this.state;

    return (
      <ReactPlayer
        id="kengine-video-player"
        ref={this.playerRef}
        url={info.videoPath}
        height="100%"
        width="100%"
        controls
        playbackRate={1}
        onStart={() => this.setState({ height: "100%" })}
        config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: this.wrapPath(info.vttPath),
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
  timer: "0"
};

VideoWindow.propTypes = {
  info: PropTypes.object.isRequired,
  timer: PropTypes.string
};

export default VideoWindow;
