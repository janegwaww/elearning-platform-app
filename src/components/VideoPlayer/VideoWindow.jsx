import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
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

  /* componentDidMount() {
   *   window.addEventListener("scroll", () => this.handleScroll(window.scrollY));
   * } */

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer);
    }
  }

  /* componentWillUnmount() {
   *   window.removeEventListener("scroll", () => this.handleScroll());
   * } */

  /* handleScroll(event) { */
  /* const { enterPip, exitPip } = this.playerRef.current;
   * if (event >= 400) {
   *   enterPip && enterPip();
   * }
   * if (event < 400) {
   *   exitPip && exitPip();
   * } */
  /* } */

  render() {
    const { info, loading } = this.props;

    return !loading && info.videoPath ? (
      <ReactVideo
        id="kengine-video-player"
        videoId={info.videoId}
        ref={this.playerRef}
        {...this.videoJsOptions}
        poster={`${info.imagePath}`}
        sources={[
          {
            src: `${info.videoPath}`,
            type: "video/mp4"
          }
        ]}
        tracks={[
          {
            src: `${info.vttPath}`,
            label: "captions on",
            kind: "captions",
            default: true
          }
        ]}
      />
    ) : (
      <Box
        height={{ xs: 200, sm: 300, md: 400, lg: 460, xl: 500 }}
        style={{
          minHeight: 200,
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
}

VideoWindow.defaultProps = {
  timer: "0"
};

VideoWindow.propTypes = {
  info: PropTypes.objectOf(PropTypes.object).isRequired,
  timer: PropTypes.string
};

export default VideoWindow;
