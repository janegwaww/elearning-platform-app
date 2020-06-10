import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import ReactVideo from "./ReactVideo";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerRef = React.createRef(null);
    this.videoJsOptions = {
      controls: true,
      preload: "auto",
      breakpoints: {
        tiny: 300,
        xsmall: 400,
        small: 500,
        medium: 600,
        large: 700,
        xlarge: 800,
        huge: 900
      },
      responsive: true,
      fluid: true,
      textTrackSettings: true,
      html5: {
        nativeTextTracks: false
      }
    };
  }

  wrapPath = path => `http://api.haetek.com:9191/${path}`;

  componentDidMount() {
    window.addEventListener("scroll", () => this.handleScroll(window.scrollY));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.handleScroll());
  }

  componentDidUpdate(prevProps) {
    const { timer, info } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer);
    }
    if (info.videoId !== prevProps.info.videoId) {
      /* this.forceUpdate(); */
    }
  }

  handleScroll(event) {
    /* const { enterPip, exitPip } = this.playerRef.current;
     * if (event >= 400) {
     *   enterPip && enterPip();
     * }
     * if (event < 400) {
     *   exitPip && exitPip();
     * } */
  }

  render() {
    const { info } = this.props;

    return info.videoPath ? (
      <ReactVideo
        id="kengine-video-player"
        videoId={info.videoId}
        ref={this.playerRef}
        {...this.videoJsOptions}
        sources={[
          {
            src: `${info.videoPath}`,
            type: "video/mp4"
          }
        ]}
        tracks={[
          {
            src: `${this.wrapPath(info.vttPath)}`,
            label: "captions on",
            kind: "captions",
            default: true
          }
        ]}
      />
    ) : null;
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
