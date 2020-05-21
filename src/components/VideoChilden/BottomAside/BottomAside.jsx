import React, { Component } from "react";

import {PlayArrow,Title,VolumeUp,FontDownload,Replay,
  Refresh} from  "@material-ui/icons";

import  styles from "./BottomAside.module.css";
import  sty from '../TopAside/TopAside.module.css';
export default ()=> (
      <ul className={`${styles.ul} ${sty.ul}` }>
  

        <li>
        <div className={styles.slider}>
                <div className={styles.left}>
                  <div>
                  <Replay />
                   
                  </div>
                  <div>
                  <Refresh />
                  
                  </div>
                </div>
              </div>
        </li>
        <li><Title /> </li>
        <li><PlayArrow /></li>
        <li><VolumeUp /></li>
        
        <li><FontDownload /></li>
      </ul>
    );
  

