import React from "react";
import ReactDOM from "react-dom";
import videojs from "video.js";
import VideoSearchWrap from "./VideoSearchWrap";

const vjsComponent = videojs.getComponent("Component");

class vjsSubtitleSearch extends vjsComponent {
  constructor(player, options) {
    super(player, options);

    this.mount = this.mount.bind(this);

    player.ready(() => {
      this.mount();
    });

    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  mount() {
    this.el().className = "vjs-video-search";
    ReactDOM.render(<VideoSearchWrap vjsComponent={this} />, this.el());
  }
}

vjsComponent.registerComponent("vjsSubtitleSearch", vjsSubtitleSearch);

export default vjsSubtitleSearch;
