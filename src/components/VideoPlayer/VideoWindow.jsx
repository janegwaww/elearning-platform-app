import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactVideo from "./ReactVideo";
import withSubtitle from "./withSubtitle";
import { startWatchRecord, endWatchRecord } from "../../services/video";
import { secondsToHMS } from "../../services/utils";

class VideoWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.playerRef = React.createRef(null);
  }

  componentDidMount() {
    this.recordStart();
    window.addEventListener("beforeunload", (e) => {
      /* e.preventDefault(); */
      return endWatchRecord({
        video_id: this.props.info.videoId,
        end_time: secondsToHMS(this.getCurrentTime()),
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    if (timer !== prevProps.timer) {
      this.seekToCurrentTime(timer);
    }
  }

  componentWillUnmount() {
    endWatchRecord({
      video_id: this.props.info.videoId,
      end_time: secondsToHMS(this.getCurrentTime()),
    });
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
      return this.playerRef.current.seekTo(timer);
    } else {
      setTimeout(() => {
        this.seekToCurrentTime(timer);
      }, 500);
    }
  }

  getCurrentTime = () => {
    if (this.playerRef.current) {
      return this.seekToCurrentTime();
    }
  };

  getPlay = () => {
    if (this.playerRef.current) {
      this.playerRef.current.player.play();
    }
  };

  getTrack = (info) => {
    const track = info.isLoged
      ? [
          {
            src: `${info.vttPath}`,
            label: "字幕开",
            kind: "subtitle",
          },
        ]
      : [
          {
            src: "",
            label: "登录开启字幕",
            kind: "notice",
          },
        ];
    return info.vttPath ? track : [];
  };

  getSource = (info) => [
    {
      src: `${info.path}`,
      type: "video/mp4",
    },
  ];

  render() {
    const { info, loading } = this.props;

    return !loading && info.path ? (
      <ReactVideo
        videoId={info.videoId}
        ref={this.playerRef}
        poster={`${info.imagePath}`}
        tracks={this.getTrack(info)}
        sources={this.getSource(info)}
      />
    ) : (
      <Box
        height={{ xs: 200, sm: 300, md: 400, lg: 460, xl: 500 }}
        style={{
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

export default withSubtitle(VideoWindow);
