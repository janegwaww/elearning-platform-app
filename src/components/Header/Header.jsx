import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";

export default class Header extends Component {
  render() {
    return (
      <header className='el-hteader'>
        <div>
          <div>
            <span>Video</span>
          </div>
          <div>
        
            <span>使用教程</span>
          </div>
        </div>
        <div>
          <div>
            <Button variant="contained">上传视频</Button>
          </div>
          <div>登录</div>
        </div>
      </header>
    );
  }
}
