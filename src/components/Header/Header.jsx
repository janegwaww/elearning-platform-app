<<<<<<< HEAD
import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const NewBtn = withStyles({
  root:{
    backgroundColor:'rgba(0, 0 , 0, 0.6)',
    color:'#fff',
    'border-radius':'18px'
  }
})(Button)

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
            <NewBtn variant="contained">上传视频</NewBtn>
          </div>
          <div>登录</div>
        </div>
      </header>
    );
  }
}
=======
import React from "react";

const Header = ({ siteTitle }) => {
  return <div>{siteTitle || "Header"}</div>;
};

export default Header;
>>>>>>> origin/develop
