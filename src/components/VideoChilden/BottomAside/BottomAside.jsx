import React, { Component } from "react";

import {PlayArrow,Title,VolumeUp,FontDownload,SubdirectoryArrowLeft,SubdirectoryArrowRight} from  "@material-ui/icons";

import  styles from "./BottomAside.module.css";

export default ()=> (
      <ul className={styles.ul}>
        <li>
        <div className={styles.slider}>
                <div className={styles.left}>
                  <div>
                    <SubdirectoryArrowLeft />
                  </div>
                  <div>
                    <SubdirectoryArrowRight />
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
  

