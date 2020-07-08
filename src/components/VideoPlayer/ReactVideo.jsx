import React from "react";
import videojs from "video.js";
import "./ReactVideo.sass";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.seekTo = this.seekTo.bind(this);
    this.videoJsOptions = {
      controls: true,
      preload: "auto",
      height: 516,
      responsive: true,
      /* fluid: true, */
      textTrackSettings: true,
      html5: {
        nativeTextTracks: false,
      },
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false,
        },
      },
      userActions: {
        hotkeys: function (event) {
          event.preventDefault();
          // rewind
          if (event.which === 37) {
            this.currentTime(this.currentTime() - 5);
          }
          // forword
          if (event.which === 39) {
            this.currentTime(this.currentTime() + 5);
          }
          // pause and play
          if (event.which === 32) {
            if (this.paused()) {
              this.play();
            } else {
              this.pause();
            }
          }
        },
      },
    };
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      { ...this.props, ...this.videoJsOptions },
      function onPlayerReady() {
        /* window.addEventListener("keydown", function (e) {
         *   e.preventDefault();
         *   if (e.which === 32) {
         *       if (this.paused()) {
         *           this.play();
         *       } else {
         *           this.pause();
         *       }
         *   }
         * }); */
        console.log("onPlayerReady", this);
      }
    );
  }

  componentDidUpdate(prevProps) {
    // When a user moves from one title to the next, the VideoPlayer component will not be unmounted,
    // instead its properties will be updated with the details of the new video. In this case,
    // we can update the src of the existing player with the new video URL.
    const { sources, tracks } = this.props;
    if (sources[0].src !== prevProps.sources[0].src) {
      if (this.player) {
        this.player.src({
          src: sources[0].src,
        });
        const oldtrack = this.player.remoteTextTracks()[0];
        this.player.removeRemoteTextTrack(oldtrack);
        this.player.addRemoteTextTrack({ ...tracks[0] }, true);
      }
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  seekTo(seconds) {
    return this.player.currentTime(seconds);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player id="kengine-react-video-player">
        <video
          ref={(node) => {
            this.videoNode = node;
          }}
          className="video-js"
          id="kengine-react-video"
        />
      </div>
    );
  }
}
