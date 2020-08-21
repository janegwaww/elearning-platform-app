import React, { Component } from "react";
import styles from "./Header.module.css";
import { navigate } from "@reach/router";

import { Button, Avatar, Snackbar } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { get_data } from "../../../assets/js/request";
import { getUser, isLoggedIn } from "../../../services/auth";

import CustomModal from "../../../assets/js/CustomModal";
import Home from "../../../assets/img/Home.svg";
import Code from "../../../assets/img/Code.svg";
import logoimg from "../../../../static/logos/logo.svg";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const NewBtn = withStyles({
  root: {
    backgroundColor: "#2E2E30",
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
  },
})(Button);

const NewBtn2 = withStyles({
  root: {
    backgroundColor: "#007CFF",
  },
})(NewBtn);

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_updata: false,
      open: false,
      files: props.parent.state.video_data,
      // is_modal: false,
      timers: true,
    };
    this.btn_user = this.btn_user.bind(this);
  }
  componentDidMount() {
    if (isLoggedIn()) {
      this.setState({
        user_info: getUser(),
      });
    }
  }
  btn_user = function(info) {
    if (!isLoggedIn()) {
      sessionStorage.setItem("no_login_page", window.location.href);

      navigate(`/users/login`);
    } else {
      sessionStorage.removeItem("now_page");
      navigate(`/users/profile`);
    }
  };
  componentWillUnmount() {
    clearInterval(this.state.timers);
    this.setState({
      timers: null,
    });
  }
  render() {
    let _this = this;
    const handleClose = () => {
      this.setState({ open: false });
    };

    const btn_save = function(el) {
      // if (el != "not") {
      //   _this.props.parent.setState({
      //     login_status: true,
      //   });
      // }

      let _video_data = _this.props.parent.state.video_data;

      let r_data = {
        model_name: "video",
        model_action: "update_subtitle",
        extra_data: {
          subtitling: _video_data.sub_josn,
          task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
          lang: _this.props.parent.state.lang == 2 ? "en" : "cn",
        },
        model_type: "",
      };

      get_data(r_data, "video").then((res) => {
        if (res.err == 0 && res.errmsg == "OK") {
          _this.setState({ open: true });

          //   if (el != "not") {
          //     setTimeout(() => {
          //       navigate(`/video/uppage`);
          //     }, 500);

          //   }
        }

        // _this.props.parent.setState({
        //   login_status: false,
        // });
      });
    };

    return (
      <header className={`box box-align-center ${styles.header}`}>
        <div className={`box box-align-center ${styles.nav}`}>
          <div className={styles.logo}>
            <img src={logoimg} alt="logo" />
          </div>
          <div
            className={`fn-size-16 ${styles.imdex}`}
            onClick={() => {
              navigate(`/`);
            }}
          >
            <span className="box box-align-center ">
              <img src={Home} />{" "}
              <span className="text-overflow" style={{ marginLeft: 12 }}>
                返回知擎首页
              </span>
            </span>
          </div>
          <div className={`fn-size-16  ${styles.shortcut}`}>
            <span className="box box-align-center">
              <img src={Code} />{" "}
              <span className="text-overflow" style={{ marginLeft: 12 }}>
                显示快捷键
              </span>
            </span>

            <div className={`fn-size-14 ${styles.shortcutCode}`}>
              <div className="box box-align-center box-between">
                <div>预览/暂停</div>
                <div>Space/空格键</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>回退/ 前进</div>
                <div>
                  <ArrowBack />/<ArrowForward />
                </div>
              </div>
              <div className="box box-align-center box-between ">
                <div>跳转到开始</div>
                <div>Home</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>跳转到结束</div>
                <div>End</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>撤回操作</div>
                <div>Ctrl+Z</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>重做操作</div>
                <div>Ctrl+Shift+Z</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>删除</div>
                <div>Delete/Backspace</div>
              </div>
            </div>
          </div>
        </div>
        <div className="box box-align-center">
          <div>
            <NewBtn2
              onClick={() => {
                if (
                  JSON.stringify(this.props.parent.state.video_data) === "{}" ||
                  !this.props.parent.state.video_data.sub_josn
                ) {
                  new CustomModal().alert(
                    "亲！还没有添加文件或生成字幕不需要保存哦！",
                    "error"
                  );
                  return;
                }

                btn_save("not");
                clearInterval(this.state.timers);
                this.setState({
                  timers: setInterval(() => {
                    btn_save("not");
                  }, 600000),
                });
              }}
            >
              定时保存
            </NewBtn2>
          </div>
          <div>
            <NewBtn2
              onClick={() => {
                if (
                  JSON.stringify(this.props.parent.state.video_data) === "{}"
                ) {
                  new CustomModal().alert("亲！还没有添加文件呢！", "error");
                  return;
                }
                if (!this.props.parent.state.video_data.sub_josn) {
                  new CustomModal().alert(
                    "亲！还没有生成字幕发布可以点击直接发布作品哦！",
                    "error"
                  );
                  return;
                }
                if (!isLoggedIn()) {
                  new CustomModal().alert(
                    "亲！还没有登录呢，正在为你跳转登录页...",
                    "error"
                  );
                  setTimeout(() => {
                    navigate(`/users/login`);
                  }, 5000);
                  return;
                }
                this.props.parent.setState({
                  login_status: true,
                });

                get_data(
                  {
                    model_name: "video",
                    model_action: "save_get_image_path",
                    extra_data: {
                      subtitling: this.props.parent.state.video_data.sub_josn,
                      task_id:
                        this.props.parent.state.video_data.video_id ||
                        this.props.parent.state.video_data.video_id,

                      style: "",
                    },
                    model_type: "",
                  },
                  "video"
                ).then((res) => {
                  let _data = res.result_data[0] || res.result_data;
                  if (_data.image_path) {
                    this.props.parent.state.video_data.image_path =
                      _data.image_path;
                    JSON.stringify(this.props.parent.state.video_data);
                    
                    if(this.props.parent.state.page_type&&this.props.parent.state.page_type=='zhiqing'){
                      navigate(`/video/zhiqingvideo`);
                      return
                    }
                    navigate(`/video/uppage`);
                  }
                  this.props.parent.setState({
                    login_status: false,
                  });
                });
              }}
            >
              发布视频
            </NewBtn2>
          </div>
          {/*<div title="点击可保存你编辑文本样式">
            <Save className={styles.save} onClick={btn_save} />
            </div>*/}

          <div onClick={this.btn_user}>
            {this.state.user_info ? (
              <div className={styles.headshot}>
                <Avatar
                  src={
                    this.state.user_info && this.state.user_info.headshot
                      ? this.state.user_info.headshot
                      : ""
                  }
                />
                {/**<span>{this.state.user_info.name}</span>
                <ArrowDropDown /> */}
              </div>
            ) : (
              <Avatar />
            )}
          </div>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message=""
        >
          <Alert onClose={handleClose} severity="success">
            保存成功
          </Alert>
        </Snackbar>
      </header>
    );
  }
}
