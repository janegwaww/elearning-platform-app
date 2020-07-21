import React from "react";
import ReactDOM from "react-dom";
import videojs from "video.js";
import SubSwitch from "./SubSwitch";

const vjsComponent = videojs.getComponent("Component");

class vjsSubSwitchButton extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.state = { disabled: false };

    /* Bind the current class context to the mount method */
    this.mount = this.mount.bind(this);

    /* When player is ready, call method to mount React component */
    player.ready(() => {
      this.mount(this.handleDisabled(player.options()));

      //   console.log("vjsComponent", this, "player", player, "options", options);
    });

    /* Remove React root when component is destroyed */
    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  handleChange = (e) => {
    if (!this.player().textTracks()[0]) return;
    if (e) {
      this.player().textTracks()[0].mode = "showing";
    } else {
      this.player().textTracks()[0].mode = "disabled";
    }
  };

  handleDisabled = (options) => {
    return options.tracks[0] ? options.tracks[0].label === "登录开启字幕" : 'noSubtitle';
  };

  /**
   * We will render out the React EpisodeList component into the DOM element
   * generated automatically by the VideoJS createEl() method.
   *
   * We fetch that generated element using `this.el()`, a method provided by the
   * vjsComponent class that this class is extending.
   */
  mount(disabled) {
    ReactDOM.render(
      <SubSwitch
        vjsComponent={this}
        handleChange={this.handleChange}
        disabled={disabled}
      />,
      this.el()
    );
  }
}

/**
 * Make sure to register the vjsComponent so Video JS knows it exists
 */
vjsComponent.registerComponent("vjsSubSwitchButton", vjsSubSwitchButton);

export default vjsSubSwitchButton;
