import React from "react";
import videoImg from "../../../assets/activity/img/banner/video.png";
import fileImg from "../../../assets/activity/img/banner/file.png";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Link } from "@material-ui/core";
const MenuBar = (props) => {
  return (
    <div
      className="contestcar"
      style={{
        position: "absolute",
        width: "1.53em",
        height: "1.14em",
        backgroundColor: "#FCF900",
        boxShadow: "0px 0.02em 0.1em 0.02em rgba(0, 0, 0, 0.1)",
        border: "0.04em solid #F54205",
        zIndex: 5,
        left: props.left || "58%",
        top: "50%",
        transform: "translate(0,-50%)",
      }}
    >
      <ClickAwayListener
        onClickAway={() => {
          props.onEvent && props.onEvent(false);
        }}
      >
        <div className="all-width all-height">
          <span
            style={{
              display: "inline-block",
              width: "0.16em",
              height: "0.16em",
              border: "0.04em solid #F54205",
              backgroundColor: "#FCF900",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translate(-50%,-50%) rotate(45deg)",
            }}
          ></span>
          <div
            className="all-width all-height box box-between"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              backgroundColor: "#FCF900",
              padding: "0.2em 0.3em ",
              flexDirection: "column",
            }}
          >
            <div>
              <Link
                color="inherit"
                target="_blank"
                underline="none"
                href="/video/?page=zhiqing"
              >
                <div className="box box-align-center  contestcar">
                  <div>
                    <img
                      src={videoImg}
                      style={{ width: "0.24em", height: "0.2em" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.16em", marginLeft: "0.3em" }}>
                    视频
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link
                color="inherit"
                target="_blank"
                underline="none"
                href="/video/zhiqingtext/"
              >
                <div className="box box-align-center contestcar">
                  <div>
                    <img
                      src={fileImg}
                      style={{
                        width: "0.2em",
                        height: "0.22em",
                        margin: "0 0.02em",
                      }}
                    />
                  </div>

                  <div style={{ fontSize: "0.16em", marginLeft: "0.3em" }}>
                    文件
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};
export default MenuBar;
