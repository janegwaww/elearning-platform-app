import React, { Component } from "react";
import styles from "./Header.module.css";
import {Button,Avatar} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {Save} from '@material-ui/icons';


const NewBtn = withStyles({
  root:{
    backgroundColor:'#2E2E30',
    color:'#fff',
    'border-radius':'16px',
    width:'140px',
    height:'32px',
   'line-height':0
  }
})(Button)
const NewBtn2 = withStyles({
  root:{
    backgroundColor:'#007CFF'
  }
})(NewBtn)

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span>Z</span>
            <span>ZhiQing</span>
          </div>
          <div>
            <NewBtn > 我的创作中心</NewBtn>
          </div>
          <div>
            <span>使用教程</span>
          </div>
        </div>
        <div>
          <div>
            <NewBtn2 variant="contained">上传视频</NewBtn2>
          </div>
          <div><Save className={styles.save} /> </div>
          <div className={styles.users}>
                <Avatar src='https://material-ui.com/static/images/avatar/1.jpg'/>
                <span>123..</span>
          </div>
        </div>
      </header>
    );
  }
}
