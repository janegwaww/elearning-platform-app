import React, { createRef, Component } from "react";
import WebUpload from "webuploader";

import "./Uploader.css";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { LibraryAdd } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { get_data } from "../../../assets/js/request";

import UpdataFile from "../../../assets/js/updataFile";
import Message from "./Message";

import { navigate } from "@reach/router";
import { getUser, isLoggedIn } from "../../../services/auth";
import { getObj, isGoLogin } from "../../../assets/js/totls";
// import md5 from "md5";
import Modal from "../../../assets/js/modal";
import dropupload from "../../../assets/img/dropupload.svg";
const NewLinearProgress = withStyles({
  root: {
    height: "10px",
    width: "100%",
    "background-color": "#FFFFFF",
    "border-radius": "5px",
    "& .MuiLinearProgress-barColorPrimary": {
      "background-color": "#007CFF",
    },
    "& .MuiLinearProgress-colorPrimary": {
      "background-color": "#FFFFFF",
    },
  },
})(LinearProgress);
const ErrorLinearProgress = withStyles({
  root: {
    "& .MuiLinearProgress-barColorPrimary": {
      "background-color": "#FE4240",
    },
  },
})(NewLinearProgress);
const NewBtn = withStyles({
  root: {
    backgroundColor: "#313134",
    color: " #F2F2F5",
    "border-radius": 16,
    height: 32,
    "line-height": 0,
    padding: "6px 30px",
  },
})(Button);
const NewBtn2 = withStyles({
  root: {
    backgroundColor: "#007CFF",
    width: 320,
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#007CFF",
    },
  },
})(NewBtn);

export default class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileName_chunk: "",
      progress: 0,
      updata_msg: null,
      status: 1, //2.上传，3.上传完成未来编辑，4,生成字幕，5.，
      is_drop: false, //是否有文件正拖进来
      promp_info: {
        //弹窗信息
        open: false,
        title: "温馨提示",
        msg: "提示内容",
        type: 1, //管理弹窗样式
      },
      files: [], //文件列表
      lang_value: "", //语言
      lang_open: false,
    };
    this.fileInput = createRef();
    this.fileInput_chunk = createRef();
    this.new_subtitles = this.new_subtitles.bind(this);
    this.query_subtitles = this.query_subtitles.bind(this);
  }
  componentDidMount() {
    let _data = this.props.parent.state.video_data;
    if (_data.video_id) {
      this.setState({
        status: 3,
        files: [_data],
      });
    }
    if (getUser().name) {
      this.setState({
        user_info: getUser(),
      });
    }
    if (sessionStorage.getItem("file_data")) {
      this.setState({
        status: 3,
        files: [JSON.parse(sessionStorage.getItem("file_data"))],
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.parent.state.uploadStatus === 4) {
      this.setState({
        status: 4,
      });
      nextProps.parent.props.parent.setState({
        uploadStatus: 0,
      });
    }
  }

  new_subtitles(str) {
    //获取新的字幕
    if (!this.state.lang_value) {
      alert("请选择视频的语言");
      return;
    }
    let _this = this;
    let _data = {
      model_name: "video",
      model_action: "generate_subtitle",

      extra_data: {
        task_id: this.state.files[0]._id || this.state.files[0].video_id,
        lang: this.state.lang_value,
      },
      model_type: "",
    };
    this.setState({
      status: 5,
    });

    get_data("api/v1/gateway", _data, "post").then((res) => {
      _this.query_subtitles(); //查询是否生成字幕
      // console.log("成功", res);
    });
  }
  query_subtitles() {
    let _this = this;
    let _data = {
      model_name: "video",
      model_type: "",
      model_action: "query_subtitle",
      extra_data: {
        task_id: this.state.files[0]._id || this.state.files[0].video_id,
      },
    };

    get_data("api/v1/gateway", _data, "post")
      .then((res) => {
        if (res.err == 4104) {
          navigate(`users/login`);
          return;
        }
        if (res.result_data[0] && res.result_data[0].subtitling) {
          _this.props.parent.get_url(res.result_data[0]);

          _this.setState({ status: 3, lang_value: "" });

          _this.props.parent.cueing(res.result_data[0].subtitling);

          return;
        } else {
          setTimeout(() => {
            _this.query_subtitles();
          }, 9000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      fileName,
      updata_msg,
      status,
      lang_value,
      lang_open,
      is_drop,
    } = this.state;
    let _this = this;
    return (
      <div className="section upload-cover fn-color-9E9EA6 ">
        <div className="nav-tabs ">
          <p>我的视频</p>
        </div>

        {_this.state.status === 1 ? (
          <div className="lists">
            <section
              className="box  box-center all-width"
              style={{ height: "calc(100% - 48px)" }}
            >
              <div
                className={`file-box ${is_drop ? "drop" : "width"}`}
                onDrop={(event) => {
                  this.setState({
                    is_drop: false,
                  });
                  event.stopPropagation();
                  event.preventDefault();
                  var files = event.dataTransfer.files[0];
                  if (files.type.split("/")[1] != "mp4") {
                    _this.setState({
                      promp_info: {
                        type: 1,
                        open: true,
                        msg: "暂只支持mp4格式的视频，其他类型视频暂不支持！",
                        title: "温馨提示",
                      },
                    });
                    return;
                  }
                  if (!isLoggedIn()) {
                    _this.setState({
                      promp_info: {
                        type: 1,
                        open: true,
                        msg: "您还没有登录，是否跳转到登录页面",
                        title: "温馨提示",
                      },
                    });
                    return false;
                  }
                  get_data("api/v1/gateway", {
                    model_name: "user",
                    model_action: "is_login",
                    extra_data: {},
                    model_type: "",
                  }).then((res) => {
                    if (res.err === 0 && res.errmsg == "OK") {
                      _this.setState({ status: 2, fileName: files.name });
                      let myFile = new UpdataFile(
                        {
                          pageObj: _this,
                          url: "http://api.haetek.com:9191/api/v1/gateway",
                          filesSize: files.size,
                          shardSize: 10 * 1024 * 1024, //一个分片大小
                        },
                        files
                      );
                      myFile.init();
                      myFile.on("progress", function(res) {
                        //监听文件上传进程
                        _this.setState({
                          progress: res.size,
                        });
                      });
                      myFile.on("onchange", function(res) {
                        console.log("onchange", res);
                      });
                      myFile.on("onload", function(res) {
                        let _data = res.response;
                        if (_data.err === -1) {
                          new Modal().alert(
                            "此视频已有人上传，暂不支持多人同时此视频，请谅解！",
                            "error",
                            5000
                          );
                          setTimeout(() => {
                            _this.setState({ status: 1, progress: 0 });
                          }, 5000);
                        }
                        console.log("onload", res);
                      });
                      myFile.on("error", function(res) {
                        console.log("error", res);
                      });
                    } else {
                      let _data = this.state.promp_info;
                      localStorage.removeItem("haetekUser");
                      _data.type = 3;
                      _data.open = true;
                      _data.msg = "登录超时，正在为你跳转登录页...";
                      _this.setState({
                        promp_info: _data,
                      });
                      setTimeout(() => {
                        _data.open = false;
                        _this.setState({
                          promp_info: _data,
                        });
                        navigate(`/users/login`);
                      }, 3000);
                    }
                  });
                  return false;
                }}
                onDragEnter={(ev) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                onDragOver={(ev) => {
                  this.setState({
                    is_drop: true,
                  });
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                onDragLeave={(ev) => {
                  this.setState({
                    is_drop: false,
                  });
                  ev.stopPropagation();
                  ev.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!isLoggedIn()) {
                    _this.setState({
                      promp_info: {
                        type: 1,
                        open: true,
                        msg: "您还没有登录，是否跳转到登录页面",
                        title: "温馨提示",
                      },
                    });
                    return false;
                  }
                  get_data("api/v1/gateway", {
                    model_name: "user",
                    model_action: "is_login",
                    extra_data: {},
                    model_type: "",
                  })
                    .then((res) => {
                      if (res.err === 0 && res.errmsg == "OK") {
                        document.getElementById("newFile").click();
                      } else {
                        let _data = this.state.promp_info;
                        localStorage.removeItem("haetekUser");
                        _data.type = 3;
                        _data.open = true;
                        _data.msg = "登录超时，正在为你跳转登录页...";
                        _this.setState({
                          promp_info: _data,
                        });
                        setTimeout(() => {
                          _data.open = false;
                          _this.setState({
                            promp_info: _data,
                          });
                          navigate(`/users/login`);
                        }, 3000);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  return false;
                }}
              >
                {!is_drop ? (
                  <div className="all-height box box-align-center">
                    <div>
                      <p
                        className="fn-color-F2F2F5 fn-size-16 box box-center"
                        style={{ marginBottom: 20 }}
                      >
                        <img src={dropupload} />
                        <span>文件拖拽到此处或点击此处可以添加上传</span>
                      </p>
                      <p>
                        视频建议为MP4格式;不要带有水印、黑边；清晰度大于720P有利于首页推荐；请勿上传色情及反动违法视频。建议使用Chrome浏览器
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>此处松开鼠标执行上传文件</p>
                )}
              </div>

              <input
                type="file"
                id="newFile"
                accept=".mp4"
                onChange={(e) => {
                  //
                  if (e.target.files[0].type.split("/")[1] != "mp4") {
                    _this.setState({
                      promp_info: {
                        type: 1,
                        open: true,
                        msg: "暂只支持mp4格式的视频，其他类型视频暂不支持！",
                        title: "温馨提示",
                      },
                    });
                    return;
                  }
                  _this.setState({
                    status: 2,
                    fileName: e.target.files[0].name,
                  });
                  let myFile = new UpdataFile({
                    fileId: "newFile",
                    pageObj: _this,
                    url: "http://api.haetek.com:9191/api/v1/gateway",
                    filesSize: e.target.files[0].size,
                    shardSize: 10 * 1024 * 1024, //一个分片大小
                  });
                  myFile.init();
                  myFile.on("progress", function(res) {
                    //监听文件上传进程
                    _this.setState({
                      progress: res.size,
                    });
                  });
                  myFile.on("onchange", function(res) {
                    console.log("onchange", res);
                    let _data = res.response;

                    if (_data.err == 0 && _data.result_data.length > 0) {
                      _this.props.parent.get_url(_data.result_data[0]); //上传成功后将地址传给播放器
                      _this.setState({
                        files: _data.result_data,
                        status: 3,
                      });
                    }
                  });
                  myFile.on("onload", function(res) {
                    let _data = res.response;
                    if (_data.err === -1) {
                      new Modal().alert(
                        "此视频已有人上传，暂不支持多人同时此视频，请谅解！",
                        "error",
                        5000
                      );
                      setTimeout(() => {
                        _this.setState({ status: 1, progress: 0 });
                      }, 5000);
                    }
                    console.log("onload", res);
                  });
                  myFile.on("error", function(res) {
                    console.log("error", res);
                  });
                }}
              />
            </section>
          </div>
        ) : (
          <div></div>
        )}
        {status === 2 ? (
          <div style={{ paddingTop: 20 }} className="all-width">
            <section className="all-width">
              <div className="box all-width " style={{ height: 135 }}>
                <div
                  className="all-height view-overflow bg-image"
                  style={{
                    width: 240,
                    borderRadius: 12,
                    border: "1px solid green",
                  }}
                ></div>
                <div
                  style={{
                    width: "calc(100% - 240px)",
                    marginLeft: 20,
                    flexDirection: "column",
                  }}
                  className="box box-between all-height"
                >
                  <p className="text-left">{fileName}</p>

                  <div>
                    <NewLinearProgress
                      variant="determinate"
                      value={this.state.progress}
                    ></NewLinearProgress>
                    <div className="box box-align-center box-between">
                      <span>{this.state.progress + "%"}</span>{" "}
                      <span className="fn-color-007CFF">会员加1.5M/S</span>
                    </div>
                    <div className="box box-between">
                      <NewBtn>添加素材到视频编辑区</NewBtn>
                      <NewBtn>删除</NewBtn>
                    </div>
                  </div>
                  <div>
                    <ErrorLinearProgress
                      style={{ backgroundColor: "red" }}
                      variant="determinate"
                      value={this.state.progress}
                    ></ErrorLinearProgress>
                    <div className="box box-align-center box-between">
                      <span>{this.state.progress + "%"}</span>
                      <span className="fn-color-FE4240">网络错误点击继续</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="box box-center" style={{ marginTop: 178 }}>
              <NewBtn2>直接发布作品</NewBtn2>
            </div>
          </div>
        ) : (
          <i></i>
        )}
        {/** 
          {status === 3 ? (
            <section>
              <div
                className="items btn"
                style={{
                  backgroundImage:
                    "url(http://api.haetek.com:9191/" +
                    _this.state.files[0].image_path +
                    ")",
                }}
              >
                <span className="edit" title="添加到编辑区">
                  <Create
                    onClick={() => {
                      get_data("api/v1/gateway", {
                        //生成图片
                        model_name: "video",
                        model_action: "generate_thumbnail",
                        extra_data: {
                          video_id:
                            _this.state.files[0]._id ||
                            this.state.files[0].video_id,
                        },
                        model_type: "",
                      }).then((res) => {
                        if (res.err === 0) {
                          this.props.parent.get_image(res.result_data);
                        }
                      });
                    }}
                  />
                </span>
                <span
                  className="del"
                  title="删除"
                  onClick={() => {
                    this.setState({
                      promp_info: {
                        type: 2,
                        open: true,
                        msg: "您将删除视频，删除后将无法恢复，是否确定要删除？",
                        title: "温馨提示",
                      },
                    });
                  }}
                >
                  <Delete />
                </span>
                <p style={{ fontSize: "10px" }}></p>
              </div>
              <p
                style={{
                  width: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {_this.state.files[0]._id || _this.state.files[0].video_id}
              </p>
            </section>
          ) : (
            <i></i>
          )}

          {_this.state.status === 4 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                this.setState({ lang_open: true });
              }}
            >
              语音智能识别提取字幕
            </Button>
          ) : (
            <i></i>
          )}
          */}

        <Message parent={this} promp_info={this.state.promp_info}></Message>

        <Dialog open={lang_open}>
          <DialogTitle>请选择上传视频的语言</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="lang"
                value={lang_value}
                onChange={(event, newValue) => {
                  _this.setState({ lang_value: newValue });
                }}
              >
                <FormControlLabel value="en" control={<Radio />} label="英文" />
                <FormControlLabel value="cn" control={<Radio />} label="中文" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                _this.setState({ lang_open: false });
              }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                _this.setState({ lang_open: false });
                _this.new_subtitles();
              }}
            >
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
