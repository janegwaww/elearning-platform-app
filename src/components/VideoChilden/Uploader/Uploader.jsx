import React, { createRef, Component } from "react";

import ProgressBar from "../../../assets/template/ProgressBar";
import "./Uploader.css";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { get_data } from "../../../assets/js/request";
import { ev_stop } from "../../../assets/js/totls";
import Message from "./Message";
import UpdataFile from "../../../assets/js/updataFile";
import { navigate } from "@reach/router";
import { getUser, isLoggedIn } from "../../../services/auth";

import BMF from "browser-md5-file";

import CustomModal from "../../../assets/js/CustomModal";
import dropupload from "../../../assets/img/dropupload.svg";

import DialogModal from "../components/Dialog";
import gologin from "../../../assets/img/gologin.png";
import uploadererr from "../../../assets/img/uploadererr.png";
import videorest from "../../../assets/img/videorest.png";


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
const SubstitleProgress = withStyles({
  root: {
    "background-color": "rgba(0,124,255,0.5)",
    "& .MuiLinearProgress-barColorPrimary": {
      "background-color": "#007CFF",
    },
  },
})(LinearProgress);
const NewBtn = withStyles({
  root: {
    backgroundColor: "#313134",
    color: " #F2F2F5",
    "border-radius": 16,
    height: 32,
    "line-height": 0,
    padding: "6px 30px",
    "&:hover": {
      backgroundColor: "#0C0C0D",
    },
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

      progress: 1,
      updata_msg: null,
      status: 1, //2.正在上传，3.上传完成成功,4.上传完成失败，5.正在生成字幕

      is_drop: false, //是否有文件正拖进来
      promp_info: {
        //弹窗信息
        open: false,
        title: "温馨提示",
        msg: "提示内容",
        type: 1, //管理弹窗样式
      },
      files: null, //文件列表i
      lang_value: "", //语言
      lang_open: false,
      progress_width: 0,
      status_text: "语音转写中...",
      login_status: false,
      is_login: {
        open: false,
        type: 3, //1 未登录 2，重复，3，失败
      },
    };
    this.myFile = null;
    this.timerRef = React.createRef();
    this.new_subtitles = this.new_subtitles.bind(this);
    this.query_subtitles = this.query_subtitles.bind(this);
    this.reset_subtitles = this.reset_subtitles.bind(this);
    this.get_image = this.get_image.bind(this);
    this.btn_del = this.btn_del.bind(this);
    this.tools_subtitles = this.tools_subtitles.bind(this);
    this.tools_status = this.tools_status.bind(this);
    this.upFile = this.upFile.bind(this);
    this.befor_upfile = this.befor_upfile.bind(this);
    this.check_again = this.check_again.bind(this);
  }
  componentDidMount() {
    if (isLoggedIn()) {
      this.setState({
        user_info: getUser(),
      });
    }
    this.myFile = new UpdataFile({
      headers: {
        key: "Authorization",
        value: "Bearer " + (getUser().token || ""),
      },
      url: "https://api2.haetek.com:9191/api/v1/gateway",
      shardSize: 10 * 1024 * 1024, //一个分片大小
      fileId: "newFile",
    });

    let _id = this.props.parent.props.location.search.split("=")[1];
    if(_id=='zhiqing'){
      this.props.parent.setState({page_type:_id});
      return
    }
    
    if (_id) {
      this.setState({
        login_status: true,
      });
      get_data({
        model_name: "video",
        model_action: "update_subtitle_again",
        extra_data: {
          video_id: _id,
        },
        model_type: "",
      }).then((res) => {
        if (res.err == 4104) {
          this.setState({
            is_login: {
              type: 1,
              open: true,
              msg: "登录超时，是否重新登录?",
            },
          });
          return;
        }
        if (res.err === 5) {
          alert("不允许多个用户同时编辑...,将关闭当前页面");
          // window.close();
          return;
        }
        this.timerRef.current = setTimeout(() => {
          this.setState({
            login_status: false,
          });
        }, 500);
        if (res.err === 0) {
          let _data = {
            image_path: res.result_data[0].image_path,
            title: res.result_data[0].title,
            video_id: res.result_data[0].video_id,
            video_path: res.result_data[0].video_path,
            video_size: res.result_data[0].video_size,
            video_time: res.result_data[0].video_time,
          };
          if (res.result_data[0].lang) {
            _data.lang = res.result_data[0].lang;
            this.setState({
              lang_value: res.result_data[0].lang,
            });
          }
          if (res.result_data[0].subtitle) {
            _data.sub_josn = res.result_data[0].subtitle;
            if (_data.sub_josn[0]&&_data.sub_josn[0].en_sub) {
              this.props.parent.setState({
                lang: 2,
              });
            } else {
              this.props.parent.setState({
                lang: 1,
              });
            }
          }
          if (res.result_data[0].description) {
            _data.description = res.result_data[0].description;
          }
          if (res.result_data[0].series_id) {
            _data.series_id = res.result_data[0].series_id;
          }
          if (res.result_data[0].user_id) {
            _data.user_id = res.result_data[0].user_id;
          }
          if (
            res.result_data[0].document &&
            res.result_data[0].document.length > 0
          ) {
            _data.document = res.result_data[0].document;
          }
          this.setState({
            status: 3,
            files: _data,
          });
          if (res.result_data[0].subtitle) {
            this.props.parent.setState({
              is_edit: true,
            });
          }

          sessionStorage.setItem("file_data", _data);
          this.props.parent.getUpfileUrl(_data);
          this.get_image(_id);
        } else {
          new CustomModal().alert(
            "获取资源失败，请尝试刷新重新获取",
            "error",
            4000
          );
        }
        // console.log(res);
      });
      // console.log(_id);
    } else if (sessionStorage.getItem("file_data")) {
      let _data = JSON.parse(sessionStorage.getItem("file_data"));

      this.setState({
        status: 3,
        files: _data,
      });
      this.props.parent.getUpfileUrl(_data);
    }
  }
  componentWillUnmount() {
    this.timerRef.current && clearTimeout(this.timerRef.current);
    this.state = () => false;
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
    get_data(
      {
        //生成图片
        model_name: "video",
        model_action: "generate_thumbnail",
        extra_data: {
          video_id: this.state.files._id || this.state.files.video_id || id,
        },
        model_type: "",
      },
      "video"
    ).then((res) => {
      if (res.err === 0 && res.result_data.length > 0) {
        this.props.parent.get_image(res.result_data);
      }
    });
  }
  upFile(_file, task_id) {
    let _this = this;

    this.myFile.init(_file, task_id);

    this.myFile.on("progress", function(res) {
      //监听文件上传进程

      _this.setState({
        progress: res.size,
      });
    });
    // this.myFile.on("onchange", function(res) {
    //   let _data = res.response;

    // });
    this.myFile.on("onload", function(res) {
      let _data = res.response;

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
        is_login: {
          type: 3,
          open: true,
        },
      });
    });
  }
  check_again(_file) {
    if (_file.type.split("/")[1] != "mp4") {
      this.setState({
        promp_info: {
          type: 1,
          open: true,
          msg: "暂只支持mp4格式的视频，其他类型视频暂不支持！",
          title: "温馨提示",
        },
      });
      return;
    }
    let _check = new BMF();
    this.setState({
      status: 2,
      progress: 2,
    });
    _check.md5(_file, (err, md5) => {
      if (err) return;
      get_data(
        //请求视频是否已有人上传
        {
          model_name: "video",
          model_action: "verify",
          extra_data: {
            token: md5,
          },
        },
        "video"
      ).then((res) => {
        if (res.err === -1) {
          this.setState({
            is_login: {
              type: 2,
              open: true,
            },
            status: 1,
            progress: 1,
          });
        } else {
          this.upFile(_file, md5);
          this.setState({
            status: 2,
            fileName: _file.name.split(".")[0],
          });
        }
      });
    });
  }
  befor_upfile(callback) {
    if (!isLoggedIn()) {
      this.setState({
        is_login: {
          type: 1,
          open: true,
        },
      });
      return false;
    }
    get_data({
      model_name: "user",
      model_action: "is_login",
      extra_data: {},
      model_type: "",
    }).then((res) => {
      if (res.err === 0 && res.errmsg == "OK") {
        callback && callback();
      } else {
        let _data = {
          type: 1,
          open: true,
          msg: "登录超时,是否重新登录?",
        };
        this.setState({
          is_login: _data,
        });
      }
    });
    return false;
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
    };
    this.setState({
      status: 5,
      progress_width: 0,
    });
    get_data(_data, "video")
      .then((res) => {
        if (res.err > 0) {
          this.tools_status(res.err, res.errmsg);
          this.timerRef.current = setTimeout(() => {
            this.query_subtitles(); //查询是否生成字幕
          }, 60000);
          this.setState({
            status: 5,
          });
        } else if (res.err === 0) {
          if (res.result_data[0] && res.result_data[0].subtitling) {
            this.setState({
              progress_width: 100,
              status: 5,
            });
            setTimeout(() => {
              this.tools_subtitles(res.result_data[0]);
            }, 11000);
          }
          return;
        } else {
          alert("生成字幕失败");
          this.setState({
            status: 3,
          });
          return;
        }
      })
      .catch((err) => {
        alert("生成字幕失败");
        // new CustomModal().alert("生成字幕失败", "error", 4000);
        this.setState({
          status: 3,
        });
      });
  }
  reset_subtitles() {
    let _data = {
      model_name: "video",
      model_action: "reset_subtitle",
      extra_data: {
        video_id: this.state.files._id || this.state.files.video_id,
        lang: this.state.lang_value,
      },
    };
    this.setState({
      progress_width: 0,
    });
    get_data(_data, "video")
      .then((res) => {
        if (res.err > 0) {
          this.tools_status(res.err, res.errmsg);
          this.timerRef.current = setTimeout(() => {
            this.query_subtitles(); //查询是否生成字幕
          }, 60000);
          this.setState({
            status: 5,
          });
        } else if (res.err === 0) {
          this.setState({
            progress_width: 100,
            status: 5,
          });
          setTimeout(() => {
            this.tools_subtitles(res.result_data[0]);
          }, 11000);
        } else {
          alert("生成字幕失败");
          this.setState({
            status: 3,
          });
        }
      })
      .catch((err) => {
        alert("生成字幕失败");
        // new CustomModal().alert("生成字幕失败", "error", 4000);
        this.setState({
          status: 3,
        });
      });
  }
  tools_subtitles(data) {
    let _data = JSON.parse(JSON.stringify(this.state.files));
    _data.sub_josn = data.subtitling;
    this.setState({ status: 3, files: _data });
    // sessionStorage.setItem('file_data',_data);

    this.props.parent.getUpfileUrl(data);
    alert("字幕已生成(如果您的视频有片头曲 可能要右移才会发现字幕哦)");
  }
  tools_status(num, _text) {
    let _w = 0;
    if (num === 1) {
      _w = 20;
    } else if (num === 2) {
      _w = 40;
    } else if (num === 3) {
      _w = 60;
    } else if (num === 4) {
      _w = 80;
    }
    this.setState({
      status_text: _text,
      progress_width: _w,
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

    get_data(_data, "video")
      .then((res) => {
        if (res.err == 4104) {
          this.setState({
            is_login: {
              type: 1,
              open: true,
              msg: "登录超时，是否重新登录？",
            },
          });
          return;
        }
        if (res.err > 0) {
          this.tools_status(res.err, res.errmsg);
          this.timerRef.current = setTimeout(() => {
            _this.query_subtitles();
          }, 60000);
        } else if (res.err === 0) {
          if (res.result_data[0] && res.result_data[0].subtitling) {
            this.setState({
              progress_width: 100,
            });
            setTimeout(() => {
              this.tools_subtitles(res.result_data[0]);
            }, 11000);

            return;
          }
        } else if (res.err == -4) {
          alert("生成字幕失败");
          this.setState({ status: 3 });
        }
        // else{
        //   this.setState({ status: 3 });
        //   new CustomModal().alert("生成字幕失败", "error", 4000);
        // };
      })
      .catch((err) => {
        this.setState({ status: 3 });
        new CustomModal().alert("生成字幕失败", "error", 4000);
        // console.log(err);
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
      login_status,
      status_text,
      is_login,
      ...other
    } = this.state;
    let _this = this;
    return (
      <div className="section upload-cover fn-color-9E9EA6 ">
      <ProgressBar loading={login_status} />
        <div className="nav-tabs ">
          <p>我的视频</p>
        </div>
        {status === 1 && (
          <div className="lists">
            <section
              className="box  box-center all-width"
              style={{ height: "calc(100% - 48px)" }}
            >
              <div
                className={`file-box ${is_drop ? "drop" : "width"}`}
                onDrop={(event) => {
                  ev_stop(event);
                  this.setState({
                    is_drop: false,
                  });
                  var files = event.dataTransfer.files[0];
                  this.befor_upfile(() => {
                    this.check_again(files);
                  });
                }}
                onDragEnter={ev_stop}
                onDragOver={(ev) => {
                  ev_stop(ev);
                  this.setState({
                    is_drop: true,
                  });
                }}
                onDragLeave={(ev) => {
                  ev_stop(ev);
                  this.setState({
                    is_drop: false,
                  });
                }}
                onClick={(e) => {
                  ev_stop(e);
                  this.befor_upfile(() => {
                  
                    document.querySelector("#newFileParent").click();
                  });
                }}
              >
                {!is_drop ? (
                  <div
                    className="all-height box box-align-center"
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <p
                        className="fn-color-F2F2F5 fn-size-16 box box-center"
                        style={{ marginBottom: 20, cursor: "pointer" }}
                      >

                      
                        <img
                          src={dropupload}
                          style={{ width: 30, height: 26, marginRight: 20 }}
                        />
                        <span style={{ cursor: "pointer" }}>
                          文件拖拽到此处或点击此处可以添加上传
                        </span>
                      </p>
                      <p style={{ cursor: "pointer" }}>
                        视频建议为MP4格式;不要带有水印、黑边；清晰度大于720P有利于首页推荐；请勿上传色情及反动违法视频。建议使用Chrome浏览器
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>此处松开鼠标执行上传文件</p>
                )}
              </div>
              <label
                htmlFor="newFile"
                id="newFileParent"
                style={{ display: "none" }}
              >
                <input
                  type="file"
                  id="newFile"
                  capture="camera"
                  accept=".mp4"
                  onChange={(e) => {
                    this.check_again(e.target.files[0]);
                  }}
                />
                {/** accept=".mp4" */}
              </label>
            </section>
          </div>
        )}
        {status >= 2 && (
          <div style={{ paddingTop: 20 }} className="all-width">
            <section
              title="双击选中视频"
              className={`all-width ${
                this.props.parent.state.is_select ? "active" : ""
              }`}
              onDoubleClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                console.log(this.props.parent.state.is_select);
                this.props.parent.setState({
                  is_select: !this.props.parent.state.is_select,
                });
                return false;
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
                  className="all-height view-overflow bg-all"
                  style={{
                    width: (240 / 1920) * this.props.parent.state.t_w,

                    borderRadius: 12,
                    border: "1px solid green",
                  }}
                >
                  {files && (
                    <img
                      className="all-width all-heiht"
                      src={files.image_path}
                    />
                  )}
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
                        {this.props.parent.state.is_edit && files.sub_josn ? (
                          <p>约{Math.round(files.video_size)}M</p>
                        ) : (
                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              this.setState({
                                lang_open: true,
                              });
                            }}
                            title="视频编辑及字幕生成"
                            className="text-overflow fn-color-white subtitle-btn subtitle-new"
                          >
                            视频编辑及字幕生成
                          </p>
                        )}
                        <p
                          title="删除"
                          className="text-overflow fn-color-white subtitle-btn subtitle-del"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.btn_del();
                          }}
                        >
                          删除
                        </p>
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
                            上传失败，点击继续
                          </span>
                        </div>
                      </div>
                    )}

                    {status === 5 && (
                      <div>
                        <div
                          className="all-width"
                          style={{
                            height: 6,
                            background: "rgba(49,49,52,1)",
                            borderradius: 3,
                          }}
                        >
                          <div
                            style={{
                              width: this.state.progress_width + "%",
                              transition: "all 10s",
                            }}
                          >
                            <SubstitleProgress />
                          </div>
                        </div>

                        <p>
                          {status_text}&nbsp;&nbsp;请稍后
                          {Math.ceil((files.video_len * 60) / 210 / 60) - 2 <= 0
                            ? Math.ceil((files.video_len * 60) / 210 / 60)
                            : Math.ceil((files.video_len * 60) / 210 / 60) - 2}
                          ~{Math.ceil((files.video_len * 60) / 210 / 60) + 3}
                          分钟..
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {status === 3 &&
              !this.props.parent.state.is_edit &&
              !files.sub_josn && (
                <div className="box box-center" style={{ marginTop: 40 }}>
                  <NewBtn2
                    disabled={status != 3}
                    onClick={() => {
                      this.setState({
                        login_status:true
                      })
                      get_data({
                        "model_name":"video",
                        "model_action":"get_image_path",
                        "extra_data":{
                        "video_id" : this.state.files.video_id
                        },
                        "model_type":""
                        },'video').then(res=>{
                          if(res.result_data[0]&&res.result_data[0].image_path){
                            let _data =JSON.parse(sessionStorage.getItem('file_data'));
                            _data.image_path=res.result_data[0].image_path;
                            this.setState({
                              files:_data
                            });
                            sessionStorage.setItem('file_data',JSON.stringify(_data));
                            if(this.props.parent.state.page_type&&this.props.parent.state.page_type=='zhiqing'){
                              navigate(`/video/zhiqingvideo`);
                              return
                            }
                            navigate(`/video/uppage`);
                          }
                          this.setState({login_status:false})
                        })
                        
                    }}
                  >
                    直接发布作品
                  </NewBtn2>
                </div>
              )}
            {status === 3 && this.props.parent.state.is_edit && files.sub_josn && (
              <div className="box box-center" style={{ marginTop: 40 }}>
                <NewBtn2
                  onClick={() => {
                    this.setState({
                      lang_open: true,
                    });
                  }}
                >
                  重新提取字幕
                </NewBtn2>
              </div>
            )}
          </div>
        )}
        {/**弹窗 */}

        <Message parent={this} promp_info={this.state.promp_info}></Message>
        <DialogModal
          _login={is_login}
          open={is_login.open || false}
          onEvent={(msg) => {
            if (msg.confirm) {
              if (is_login.type == 1) {
                localStorage.removeItem("haetekUser");
                navigate(`/users/login`);
              }
              if (is_login.type == 3) {
                this.myFile.start();
                _this.setState({
                  status: 2,
                });
              }
            }
            this.setState({
              is_login: {
                is_loging: false,
              },
            });
          }}
        >
          {is_login.type == 1 && (
            <div className="fn-size-16 fn-color-2C2C3B text-center">
              <img
                src={gologin}
                alt=""
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -135,
                  zIndex: 1000,
                  width: 185,
                  height: 135,
                  transform: "translateX(-50%)",
                }}
              />
              <div className="text-center" style={{ margin: "24px 0" }}>
                {is_login.msg ? is_login.msg : "亲, 此操作需登录, 是否登录?"}
              </div>
            </div>
          )}
          {is_login.type == 2 && (
            <div className="text-center fn-size-16 fn-color-2C2C3B">
              <img src={videorest} alt="" style={{ width: 127, height: 115 }} />
              <div style={{ margin: "40px 0 24px 0" }}>
                该作品已存在, 请勿重复上传!
              </div>
            </div>
          )}
          {is_login.type == 3 && (
            <div className="text-center fn-size-16 fn-color-2C2C3B">
              <img
                src={uploadererr}
                alt=""
                style={{ width: 110, height: 165 }}
              />
              <div style={{ margin: "40px 0 24px 0" }}>作品上传失败!</div>
            </div>
          )}
        </DialogModal>
        <Dialog open={lang_open}>
          <DialogTitle>请选择上传视频的源语言</DialogTitle>
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
                  new CustomModal().alert("请选择视频的源语言", "error", 3000);
                  return;
                }
                this.props.parent.show_edit();
                _this.setState({ lang_open: false });
                if (files.sub_josn) {
                  _this.reset_subtitles(); //重新生成字幕
                } else {
                  _this.new_subtitles(); //生成新的字幕
                }
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
