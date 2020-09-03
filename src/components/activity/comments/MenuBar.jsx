import React from 'react';
import videoImg from "../../../assets/activity/img/banner/video.png";
import fileImg from "../../../assets/activity/img/banner/file.png";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Link } from "@material-ui/core";
const MenuBar=(props)=>(
    <div
          style={{
            position: "absolute",
            width: 153,
            height: 114,
            backgroundColor: "#FCF900",
            boxShadow: "0px 2px 10px 2px rgba(0, 0, 0, 0.1)",
            border: "4px solid #F54205",
            zIndex: 5,
            left: props.left||"58%" ,
            top: "50%",
            transform: "translate(0,-50%)",
          }}
        >
        <ClickAwayListener onClickAway={()=>{
            props.onEvent&&props.onEvent(false)
        }}>
          <div className="all-width all-height">
            <span
              style={{
                display: "inline-block",
                width: "1rem",
                height: "1rem",
                border: "4px solid #F54205",
                backgroundColor: "#FCF900",
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translate(-50%,-50%) rotate(45deg)",
              }}
            ></span>
            <div
              className="all-width all-height"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                backgroundColor: "#FCF900",
                padding: "20px 40px",
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <Link
                  color="inherit"
                  target="_blank"
                  underline="none"
                  href="/video/?page=zhiqing"
                  
                >
                  <div className="box box-align-center">
                    <img src={videoImg} style={{ width: 24, height: 20 }} />
                    &nbsp; 视频
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  color="inherit"
                  target="_blank"
                  underline="none"
                  href="/video/zhiqingtext"
                >
                  <div className="box box-align-center">
                    <img src={fileImg} style={{ width: 20, height: 22 }} />
                    &nbsp; 文件
                  </div>
                </Link>
              </div>
            </div>
         
            </div>
            </ClickAwayListener>
        </div>
);
export default MenuBar;