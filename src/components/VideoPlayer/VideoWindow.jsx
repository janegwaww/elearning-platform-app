import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import defer from "lodash/defer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactVideo from "./ReactVideo";
import withSubtitle from "./withSubtitle";
import { secondsToHMS } from "../../services/utils";
import { startWatchRecord, endWatchRecord } from "../../services/video";

class VideoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerRef = React.createRef(null);

    this.recordStart = this.recordStart.bind(this);
    this.seekToCurrentTime = this.seekToCurrentTime.bind(this);
    this.getPlay = this.getPlay.bind(this);
    this.getTrack = this.getTrack.bind(this);
    this.getSource = this.getSource.bind(this);
  }

  componentDidMount() {
    this.recordStart();
    window.addEventListener("beforeunload", () => {
      return endWatchRecord({
        video_id: this.props.info.videoId,
        end_time: secondsToHMS(this.seekToCurrentTime()),
      });
    });
  }

  componentWillUnmount() {
    endWatchRecord({
      video_id: this.props.info.videoId,
      end_time: secondsToHMS(this.seekToCurrentTime()),
    });
  }

  recordStart() {
    if (this.playerRef.current) {
      const { player } = this.playerRef.current;
      player &&
        player.one("play", () => {
          startWatchRecord({
            video_id: this.props.info.videoId,
            start_time: secondsToHMS(this.seekToCurrentTime()),
          });
        });
    } else {
      defer(this.recordStart);
    }
  }

  // 跳转时间
  seekToCurrentTime(timer) {
    let result = 0;
    if (this.playerRef.current) {
      result = this.playerRef.current.seekTo(timer);
    } else {
      defer(() => this.seekToCurrentTime(timer));
    }
    return result;
  }

  getPlay() {
    if (this.playerRef.current) {
      this.playerRef.current.player.play();
    }
  }

  getTrack(info) {
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
            kind: "metadata",
          },
        ];
    return info.vttPath ? track : [];
  }

  getSource(info) {
    return [
      {
        src: `${info.path}`,
        type: "video/mp4",
      },
    ];
  }

  render() {
    const { info, loading } = this.props;

    return !loading && info.path ? (
      <ReactVideo
        videoId={info.videoId}
        ref={this.playerRef}
        poster={`${info.imagePath}`}
        tracks={this.getTrack(info)}
        sources={this.getSource(info)}
        trackDisplay={info.trackDisplay}
      />
    ) : (
      <Box
        height={{ xs: 216, sm: 316, md: 416, lg: 516, xl: 516 }}
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

VideoWindow.propTypes = {
  info: PropTypes.object.isRequired,
};

export default withSubtitle(VideoWindow);
