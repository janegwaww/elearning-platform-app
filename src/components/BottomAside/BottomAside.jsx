import React, { Component } from "react";
import "./BottomAside.css";


import {SignalCellular4BarTwoTone,Brightness1,FormatColorTextTwoTone} from  "@material-ui/icons";
export default class BottomAside extends Component {
  render() {
    return (
      <ul>
        <li><Brightness1 />  </li>
        <li><Brightness1  /></li>
        <li><SignalCellular4BarTwoTone  className='tr'/></li>
        <li><FormatColorTextTwoTone /></li>
      </ul>
    );
  }
}
