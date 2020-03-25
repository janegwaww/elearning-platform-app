import React, { Component } from "react";

import {Brightness1,PlayArrow,FormatColorTextTwoTone} from  "@material-ui/icons";

import "./BottomAside.css";

export default class BottomAside extends Component {
  render() {
    return (
      <ul>
        <li><Brightness1 />  </li>
        <li><Brightness1  /></li>
        <li><PlayArrow /></li>
        <li><FormatColorTextTwoTone /></li>
      </ul>
    );
  }
}
