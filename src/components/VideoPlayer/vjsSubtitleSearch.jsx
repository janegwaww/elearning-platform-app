import React from "react";
import ReactDOM from "react-dom";
import videojs from "video.js";
import VideoSearchWrap from "./VideoSearchWrap";
import { getIdFromHref, secondsToHMS } from "../../services/utils";
import { ksearchRecord } from "../../services/video";

const vjsComponent = videojs.getComponent("Component");

class vjsSubtitleSearch extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.state = {
      jumpTime: "",
      queryString: "",
      queryResult: [],
      vid: options.playerOptions.videoId,
    };

    this.mount = this.mount.bind(this);
    this.verifyTimer = this.verifyTimer.bind(this);
    this.handleJump = this.handleJump.bind(this);

    player.ready(() => {
      this.mount();
      this.verifyTimer();
    });

    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  verifyTimer() {
    const { time } = getIdFromHref();
    if (time) {
      this.player_.currentTime(time);
    }
  }

  handleJump(time) {
    const { vid, queryString } = this.state;
    this.player_.currentTime(time);
    this.setState({ jumpTime: time });
    // 记录搜索点击用的
    ksearchRecord({
      video_id: vid,
      query_string: queryString,
      match_time: secondsToHMS(time),
    });
  }

  mount() {
    this.el().className = "vjs-subtitle-search";
    ReactDOM.render(<VideoSearchWrap vjsComponent={this} />, this.el());
  }
}

vjsComponent.registerComponent("vjsSubtitleSearch", vjsSubtitleSearch);

export default vjsSubtitleSearch;
