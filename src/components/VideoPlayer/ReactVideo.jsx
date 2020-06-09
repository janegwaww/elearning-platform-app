import React from "react";
import videojs from "video.js";
import "./ReactVideo.sass";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.seekTo = this.seekTo.bind(this);
    this.enterPip = this.enterPip.bind(this);
    this.exitPip = this.exitPip.bind(this);
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  seekTo(seconds) {
    this.player.currentTime(seconds);
  }

  enterPip() {
    this.player.ready(() => {
      if (!this.player.paused() && !this.player.isInPictureInPicture()) {
        this.player.requestPictureInPicture().catch(e => {
          console.log(e);
        });
      }
    });
  }

  exitPip() {
    if (this.player.isInPictureInPicture()) {
      this.player.exitPictureInPicture();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            className="video-js"
          ></video>
        </div>
      </div>
    );
  }
}
