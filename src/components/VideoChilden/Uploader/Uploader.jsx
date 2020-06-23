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

import { withStyles } from "@material-ui/core/styles";
import { get_data } from "../../../assets/js/request";

import Message from "./Message";
import UpdataFile from "../../../assets/js/updataFile";
import { navigate } from "@reach/router";
import { getUser, isLoggedIn } from "../../../services/auth";
import { getObj } from "../../../assets/js/totls";
// import md5 from "md5";
import CustomModal from "../../../assets/js/CustomModal";
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
      // fileName_chunk: "",
      progress: 1,
      updata_msg: null,
      status: 1, //2.正在上传，3.上传完成成功,4.上传完成失败，5.正在生成字幕
      // is_suc:false,//上传完成后，true上传成功，
      is_drop: false, //是否有文件正拖进来
      promp_info: {
        //弹窗信息
        open: false,
        title: "温馨提示",
        msg: "提示内容",
        type: 1, //管理弹窗样式
      },
      files: null, //文件列表
      lang_value: "", //语言
      lang_open: false,
    };
    this.myFile = null;

    this.new_subtitles = this.new_subtitles.bind(this);
    this.query_subtitles = this.query_subtitles.bind(this);
    this.get_image = this.get_image.bind(this);
    this.btn_del = this.btn_del.bind(this);
  }
  componentDidMount() {
    console.log(this.props.parent.props.location.href);
    if (getUser().name) {
      this.setState({
        user_info: getUser(),
      });
    }
    this.myFile = new UpdataFile({
      headers: {
        key: "Authorization",
        value: "Bearer " + (getUser().token || ""),
      },
      url: "http://api.haetek.com:9191/api/v1/gateway",
      shardSize: 10 * 1024 * 1024, //一个分片大小
      fileId: "newFile",
    });
    let _id = this.props.parent.props.location.href.split("=")[1];
    if (_id) {
      get_data("api/v1/gateway", {
        model_name: "video",
        model_action: "update_subtitle_again",
        extra_data: {
          video_id: _id,
        },
        model_type: "",
      }).then((res) => {
        if (res.err === 0) {
          let _data = {
            image_path: res.result_data[0].image_path,
            title: res.result_data[0].title,
            video_id: res.result_data[0].video_id,
            video_path: res.result_data[0].video_path,
            video_size: res.result_data[0].video_size,
            video_time: res.result_data[0].video_time,
          };
          if(res.result_data[0].subtitle){
            _data.sub_josn=res.result_data[0].subtitle
          }
          if(res.result_data[0].description){
            _data.description=res.result_data[0].description
          }
          if(res.result_data[0].series_id){
            _data.series_id=res.result_data[0].series_id
          }
          this.setState({
            status: 3,
            files: _data,
          });
          sessionStorage.setItem('file_data',_data)
          this.props.parent.getUpfileUrl(_data);
          this.get_image(_id);
        }
        console.log(res);
      });
      console.log(_id);
    } else if (sessionStorage.getItem("file_data")) {
      let _data = JSON.parse(sessionStorage.getItem("file_data"));

      this.setState({
        status: 3,
        files: _data,
      });
      this.props.parent.getUpfileUrl(_data);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.is_del) {
      this.btn_del();
    }
  }
  btn_del() {
    this.setState({
      promp_info: {
        type: 2,
        open: true,
        msg: "您将删除视频，删除后将无法恢复，是否确定要删除？",
        title: "温馨提示",
      },
    });
  }
  get_image(id) {
    get_data("api/v1/gateway", {
      //生成图片
      model_name: "video",
      model_action: "generate_thumbnail",
      extra_data: {
        video_id: this.state.files._id || this.state.files.video_id ||id,
      },
      model_type: "",
    }).then((res) => {
      if (res.err === 0 && res.result_data.length > 0) {
        this.props.parent.get_image(res.result_data);
      }
    });
  }

  new_subtitles(str) {
    //获取新的字幕

    let _this = this;
    let _data = {
      model_name: "video",
      model_action: "generate_subtitle",

      extra_data: {
        task_id: this.state.files._id || this.state.files.video_id,
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
        task_id: this.state.files._id || this.state.files.video_id,
      },
    };

    get_data("api/v1/gateway", _data, "post")
      .then((res) => {
        console.log(res.errmsg);
        if (res.err == 4104) {
          navigate(`users/login`);
          return;
        }

        if (res.result_data[0] && res.result_data[0].subtitling) {
          let _data = JSON.parse(JSON.stringify(_this.state.files));
          _data.sub_josn = res.result_data[0].subtitling;
          _this.setState({ status: 3, lang_value: "", files: _data });
          // sessionStorage.setItem('file_data',_data);
          _this.props.parent.getUpfileUrl(res.result_data[0]);

          return;
        } else {
          setTimeout(() => {
            _this.query_subtitles();
          }, 9000);
        }
      })
      .catch((err) => {
        this.setState({ status: 3 });
        new CustomModal().alert("生成字幕失败", "error", 4000);
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
      files,
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
                  event.stopPropagation();
                  event.preventDefault();
                  this.setState({
                    is_drop: false,
                  });

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
                        type: 3,
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

                      this.myFile.init(files);
                      this.myFile.on("progress", function(res) {
                        //监听文件上传进程

                        _this.setState({
                          progress: res.size,
                        });
                      });
                      this.myFile.on("onchange", function(res) {
                        let _data = res.response;
                        if (_data.err === -1) {
                          new CustomModal().alert(
                            "此视频已存在，暂不支持多人同时此视频，请谅解！",
                            "error",
                            5000
                          );
                          setTimeout(() => {
                            _this.setState({ status: 1, progress: 1 });
                          }, 5000);
                          _this.myFile.stop();
                        }
                      });
                      this.myFile.on("onload", function(res) {
                        let _data = res.response;

                        if (_data.err === -1) {
                          new CustomModal().alert(
                            "此视频已有人上传，暂不支持多人同时此视频，请谅解！",
                            "error",
                            5000
                          );
                          setTimeout(() => {
                            _this.setState({ status: 1, progress: 0 });
                          }, 5000);
                        }
                        if (_data.err === 0 && _data.result_data.length > 0) {
                          new CustomModal().alert("上传成功", "success", 3000);
                          _this.setState({
                            files: _data.result_data[0],
                            status: 3,
                          });
                          sessionStorage.setItem(
                            "file_data",
                            JSON.stringify(_data.result_data[0])
                          );
                          _this.props.parent.getUpfileUrl(_data.result_data[0]); //上传给父级
                          _this.get_image(); //获取缩略图
                        }
                      });
                      this.myFile.on("error", function(res) {
                        _this.setState({
                          status: 4,
                        });
                        new CustomModal().alert(
                          "上传失败,网络错误!",
                          "error",
                          3000
                        );
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
                  ev.stopPropagation();
                  ev.preventDefault();
                  this.setState({
                    is_drop: true,
                  });
                }}
                onDragLeave={(ev) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  this.setState({
                    is_drop: false,
                  });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!isLoggedIn()) {
                    _this.setState({
                      promp_info: {
                        type: 3,
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

                  this.myFile.init();

                  this.myFile.on("progress", function(res) {
                    //监听文件上传进程

                    _this.setState({
                      progress: res.size,
                    });
                  });

                  this.myFile.on("onchange", function(res) {
                    let _data = res.response;
                    if (_data.err === -1) {
                      new CustomModal().alert(
                        "此视频已存在，暂不支持多人同时此视频，请谅解！",
                        "error",
                        5000
                      );
                      setTimeout(() => {
                        _this.setState({ status: 1, progress: 1 });
                      }, 5000);
                      _this.myFile.stop();
                    }
                  });
                  this.myFile.on("onload", function(res) {
                    let _data = res.response;

                    if (_data.err === -1) {
                      new CustomModal().alert(
                        "此视频已存在，暂不支持多人同时此视频，请谅解！",
                        "error",
                        5000
                      );
                      setTimeout(() => {
                        _this.setState({ status: 1, progress: 1 });
                      }, 5000);
                    }
                    if (_data.err === 0 && _data.result_data.length > 0) {
                      new CustomModal().alert("上传成功", "success", 3000);
                      _this.setState({
                        files: _data.result_data[0],
                        status: 3,
                      });
                      sessionStorage.setItem(
                        "file_data",
                        JSON.stringify(_data.result_data[0])
                      );
                      _this.props.parent.getUpfileUrl(_data.result_data[0]); //上传给父级
                      _this.get_image(); //获取缩略图
                    }
                  });
                  this.myFile.on("error", function(res) {
                    _this.setState({
                      status: 4,
                    });
                    new CustomModal().alert(
                      "上传失败,网络错误!",
                      "error",
                      3000
                    );
                    // console.log("error", res.response);
                  });
                }}
              />
            </section>
          </div>
        ) : (
          <div></div>
        )}
        {status >= 2 ? (
          <div style={{ paddingTop: 20 }} className="all-width">
            <section
              className={`all-width ${
                this.props.parent.state.is_select ? "active" : ""
              }`}
              onClick={() => {
                this.props.parent.setState({
                  is_select: !this.props.parent.state.is_select,
                });
              }}
            >
              <div
                className="box all-width "
                style={{
                  height:
                    (((240 / 1920) * this.props.parent.state.t_w) / 16) * 9,
                }}
                draggable={this.props.parent.state.is_edit ? false : true}
                onDrag={(event) => {
                  event.preventDefault();

                  event.target.style.opacity = 0.5;
                }}
                onDragEnd={(event) => {
                  event.preventDefault();
                  event.target.style.opacity = 1;
                }}
              >
                <div
                  className="all-height view-overflow bg-image"
                  style={{
                    width: (240 / 1920) * this.props.parent.state.t_w,

                    borderRadius: 12,
                    border: "1px solid green",
                    backgroundImage: files && "url(" + files.image_path + ")",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    width:
                      "calc(100% - " +
                      (240 / 1920) * this.props.parent.state.t_w +
                      "px)",
                    marginLeft: 20,
                    flexDirection: "column",
                  }}
                  className="box box-between all-height"
                >
                  <p className="text-left">{files ? files.title : fileName}</p>

                  <div>
                    {status === 2 && (
                      <div>
                        <NewLinearProgress
                          variant="determinate"
                          value={this.state.progress - 1}
                        ></NewLinearProgress>
                        <div className="box box-align-center box-between">
                          <span>{this.state.progress - 1 + "%"}</span>{" "}
                          <span className="fn-color-007CFF">会员加1.5M/S</span>
                        </div>
                      </div>
                    )}

                    {status === 3 && (
                      <div className="box box-between box-align-center">
                        {this.props.parent.state.is_edit ? (
                          <p>约{Math.round(files.video_size)}M</p>
                        ) : (
                          <NewBtn
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              // this.get_image();
                              this.props.parent.show_edit();
                            }}
                          >
                            视频编辑及字幕生成
                          </NewBtn>
                        )}
                        <NewBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.btn_del();
                          }}
                        >
                          删除
                        </NewBtn>
                      </div>
                    )}
                    {status === 4 && (
                      <div>
                        <ErrorLinearProgress
                          style={{ backgroundColor: "red" }}
                          variant="determinate"
                          value={this.state.progress}
                        ></ErrorLinearProgress>
                        <div className="box box-align-center box-between">
                          <span>{this.state.progress - 1 + "%"}</span>
                          <span
                            className="fn-color-FE4240"
                            onClick={() => {
                              this.myFile.start();
                              _this.setState({
                                status: 2,
                              });
                            }}
                          >
                            网络错误点击继续
                          </span>
                        </div>
                      </div>
                    )}

                    {status === 5 && (
                      <div>
                        <LinearProgress color="secondary" />
                        <p>正在生成，请稍后..</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {status === 3 &&
              !this.props.parent.state.is_edit &&
              !files.sub_josn && (
                <div className="box box-center" style={{ marginTop: 100 }}>
                  <NewBtn2
                    disabled={status != 3}
                    onClick={() => {
                      navigate(`/video/uppage`);
                    }}
                  >
                    直接发布作品
                  </NewBtn2>
                </div>
              )}
            {status === 3 &&
              this.props.parent.state.is_edit &&
              !files.sub_josn && (
                <div className="box box-center" style={{ marginTop: 100 }}>
                  <NewBtn2
                    onClick={() => {
                      this.setState({
                        lang_open: true,
                      });
                    }}
                  >
                    智能生成语音字幕
                  </NewBtn2>
                </div>
              )}
          </div>
        ) : (
          <i></i>
        )}
        {/**弹窗 */}

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
                if (!this.state.lang_value) {
                  new CustomModal().alert("请选择视频的语言", "error", 3000);
                  return;
                }
                _this.setState({ lang_open: false, status: 5 });
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
