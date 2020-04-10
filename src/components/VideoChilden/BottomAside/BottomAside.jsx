import React, { Component } from "react";

import {PlayArrow,Title,VolumeUp,FontDownload} from  "@material-ui/icons";

import "./BottomAside.css";

export default ()=> (
      <ul >
        <li><Title /> </li>
        <li><PlayArrow /></li>
        <li><VolumeUp /></li>
        
        <li><FontDownload /></li>
      </ul>
    );
  

