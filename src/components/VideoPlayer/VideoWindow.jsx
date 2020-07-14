import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactVideo from "./ReactVideo";
import { startWatchRecord } from "../../services/video";
import { secondsToHMS } from "../../services/utils";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerRef = React.createRef(null);
  }

  componentDidMount() {
    this.recordStart();
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.seekToCurrentTime(timer);
    }
  }

  recordStart = () => {
    if (this.playerRef.current) {
      const { player } = this.playerRef.current;
      player &&
        player.one("play", (e) => {
          startWatchRecord({
            video_id: this.props.info.videoId,
            start_time: secondsToHMS(this.getCurrentTime()),
          });
        });
    } else {
      setTimeout(() => {
        this.recordStart();
      }, 500);
    }
  };

  // 跳转时间
  seekToCurrentTime(timer) {
    if (this.playerRef.current) {
      this.playerRef.current.seekTo(timer);
    } else {
      setTimeout(() => {
        this.seekToCurrentTime(timer);
      }, 500);
    }
  }

  getCurrentTime = () => {
    if (this.playerRef.current) {
      return this.playerRef.current.seekTo();
    }
  };

  render() {
    const { info, loading } = this.props;
    const tracks = info.vttPath
      ? [
          {
            src: `${info.vttPath}`,
            label: "字募开",
            kind: "subtitle",
            default: true,
          },
        ]
      : [];

    return !loading && info.videoPath ? (
      <ReactVideo
        videoId={info.videoId}
        ref={this.playerRef}
        poster={`${info.imagePath}`}
        tracks={tracks}
        sources={[
          {
            src: `${info.videoPath}`,
            type: "video/mp4",
          },
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
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
}

VideoWindow.defaultProps = {
  timer: 0,
};

VideoWindow.propTypes = {
  info: PropTypes.object.isRequired,
  timer: PropTypes.number,
};

export default VideoWindow;
