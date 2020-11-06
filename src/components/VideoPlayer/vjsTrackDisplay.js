import videojs from "video.js";

const TextTrackDisplay = videojs.getComponent("TextTrackDisplay");

class vjsTrackDisplay extends TextTrackDisplay {
  constructor(player, options) {
    super(player, options);

    this.updateDisplayBackend = this.updateDisplayBackend.bind(this);

    player.ready(() => {
      player.on("texttrackchange", this.updateDisplayBackend);
    });
  }

  updateDisplayBackend() {
    const overrides = this.options_.playerOptions.trackDisplay;
    const tracks = this.player_.textTracks();

    if (
      overrides === null ||
      typeof overrides !== "object" ||
      Object.getOwnPropertyNames(overrides).length === 0
    ) {
      return;
    }

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      this.updateDisplayStateBackend(track);
    }
  }

  updateDisplayStateBackend(track) {
    // 字募要根据后台传过来的值改变样式
    // 要改变的样式有这几个：
    // color(值没有限制),
    // fontFamily(值没有限制),
    // fontSize(值要有限制),
    // fontStyle(不用限制),
    // letterSpacing(要有限制),
    // lineHeight(要有限制),
    // writingMode(不用限制),
    // position(限制为九宫格)
    const overrides = this.options_.playerOptions.trackDisplay;
    const cues = track.activeCues;

    let i = cues.length;

    while (i--) {
      const cue = cues[i];

      if (!cue) {
        continue;
      }

      const cueDiv = cue.displayState;
      if (overrides.position) {
        // cueDiv.parentNode.style.top = overrides.top;
        // cueDiv.parentNode.style.left = overrides.left;
      }
      if (overrides.textAlign) {
        cueDiv.style.textAlign = overrides.textAlign;
      }
      if (overrides.color) {
        cueDiv.firstChild.style.color = overrides.color;
      }
      if (overrides.fontFamily) {
        cueDiv.firstChild.style.fontFamily = overrides.fontFamily;
      }
      if (overrides.fontSize) {
        cueDiv.firstChild.style.fontSize = overrides.fontSize;
      }
      if (overrides.fontStyle) {
        cueDiv.firstChild.style.fontStyle = overrides.fontStyle;
      }
      if (overrides.letterSpacing) {
        cueDiv.firstChild.style.letterSpacing = overrides.letterSpacing;
      }
      if (overrides.lineHeight) {
        cueDiv.firstChild.style.lineHeight = overrides.lineHeight;
      }
      if (overrides.writingMode) {
        cueDiv.firstChild.style.writingMode = overrides.writingMode;
      }
      if (overrides.textDecoration) {
        cueDiv.firstChild.style.textDecoration = overrides.textDecoration;
      }
    }
  }
}

TextTrackDisplay.registerComponent("TextTrackDisplay", vjsTrackDisplay);

export default vjsTrackDisplay;
