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
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.playerRef.current.seekTo(timer);
    }
  }

  render() {
    const { info, loading } = this.props;

    return !loading && info.videoPath ? (
      <ReactVideo
        videoId={info.videoId}
        ref={this.playerRef}
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
          minHeight: 400,
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
  info: PropTypes.object.isRequired,
  timer: PropTypes.string
};

export default VideoWindow;
