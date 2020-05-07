import React, { createRef, Component } from "react";
import WebUpload from "webuploader";
import axios from "axios";
import "./Uploader.css";
import { Button, LinearProgress, Dialog } from "@material-ui/core";
import { Delete, Add, Create } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import getData from "../../../assets/js/request";
import { getUser, isLoggedIn } from "../..//../services/auth";
import UpdataFile from "../../../assets/js/updataFile";
import Message from "./Message";
import Message1 from './Message1';
// import md5 from "md5";

const NewLinearProgress = withStyles({
  root: {
    position: "absolute",
    bottom: "10px",
    left: 0,
    height: "10px",
    width: "100%",
    "background-color": "#FFFFFF",
    "border-radius": "5px",
    "& .MuiLinearProgress-barColorPrimary": {
      "background-color": "#039C93",
    },
    "& .MuiLinearProgress-colorPrimary": {
      "background-color": "#FFFFFF",
    },
  },
})(LinearProgress);
export default class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileName_chunk: "",
      progress: 0,
      updata_msg: null,
      status: 1, //2.上传，3.上传完成未来编辑，4,生成图片，5.生成字幕，
      dialogOpen: false,
      files: [], //文件列表
    };
    this.fileInput = createRef();
    this.fileInput_chunk = createRef();
    this.new_subtitles = this.new_subtitles.bind(this);
    this.query_subtitles = this.query_subtitles.bind(this);
  }
  componentDidMount() {
    this.createUploader();
    if (getUser().name) {
      this.setState({
        user_info: getUser(),
      });
    }
  }
  
  beforeSend() {
    WebUpload.Uploader.register(
      {
        "before-send": "checkchunk",
      },
      {
        checkchunk: (block) => {
          var blob = block.blob.getSource();
          let deferred = WebUpload.Deferred();
          this.setState({
            status: 2,
          });
          //   这个肯定是异步的，需要通过FileReader读取blob后再算。
          // WebUpload.Uploader.prototype.md5File(blob, function(error, ret) {
          //   读取md5出错的话，分片不能跳过。
          // console.log(ret);
          // if (error) {
          //   deferred.resolve();
          // } else {
          //   方案二
          //   在这个文件上传前，一次性把所有已成功的分片md5拿到。
          //   在这里只需本地验证就ok
          // this.getHash().then(data => {
          const arr = Array.from({ length: 50 }).reduce(
            (acc, cur, index) => acc.concat(index),
            []
          );
          // if (arr.includes(block.chunk)) {
          if (false) {
            deferred.reject();
          } else {
            deferred.resolve();
          }
          // }
          // });
          return deferred.promise();
          // });
        },
      }
    );
  }
 
  createUploader = () => {
    let task_id = WebUpload.Base.guid();
    this.beforeSend();
    let _this = this;
    this.uploader = WebUpload.create({
      server: "http://192.168.0.200:9191/video/upload",
      auto: true,
      chunked: true,
      chunkedSize: 20 * 1024 * 1024,
      chunkRetry: 10,
      threads: 1,
      duplicate: true,
      formData: {
        task_id: task_id,
        video_type: "mp4",
        name1: "mp4",
        Authorization:
          "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODgwNzg5ODIsImlhdCI6MTU4ODA2NDU4MiwiaXNzIjoiaGVpZHVua2VqaSIsImRhdGEiOnsiX2lkIjoiMjAyMDA0MjUxNDMyMjM4Mjg4MTUifX0.bh61pObsbbdrOU_Yr7Y2J_a_aRxs9aRkr02hLrM7drE",
      },
      accept: {
        title: "video",
        extensions: "mp4",
        mimeTypes: "video/*",
      },
      pick: "#filePicker",
    });

    this.uploader.on("uploadComplete", function(file) {});
    this.uploader.on("uploadSuccess", (file, res) => {
      if (res.err == 0) {
        _this.setState({
          updata_msg: res.result_data[0],
          status: 4,
        });
        _this.props.parent.get_url(res.result_data[0]);
        alert("上传成功！");

        //_this.new_subtitles(); //生成字幕
      }
    });

    // this.uploader.on("uploadBeforeSend", (file) => {
    //   if (!isLoggedIn() && file.start == 0) {
    //     this.uploader.stop();
    //     if (this.state.status != 9) {
    //       this.setState({ status: 9 });
    //       setTimeout(() => {
    //         let _host = this.props.parent.props.parent.props.location.origin;
    //         window.location.href = _host + "/users/login";
    //       }, 3000);
    //     }
    //   }
    //   return false;
    // });
    this.uploader.on("uploadError", function(file, err) {
      console.log("error: ", file);
      console.log(err);
    });
    this.uploader.on("uploadProgress", (pro) => {
      this.setState({
        progress: parseInt(100 - pro.remaning * (100 / pro.blocks.length), 10),
      });
    });
  };

  new_subtitles(str) {
    if (!this.state.lang) {
      alert("请选择来源");
      return;
    }
    let _this = this;
    let _data = {
      model_action: "generate",
      extra_data: {
        task_id: _this.state.updata_msg.video_id || _this.state.updata_msg._id,
        lang: this.state.lang,
      },
    };
    this.setState({
      status: 5,
    });
    getData("video/subtitle", _data, "post")
      .then((res) => {
        _this.query_subtitles(); //查询是否生成字幕
        // console.log("成功", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  query_subtitles() {
    let _this = this;
    let _data = {
      model_action: "query",
      extra_data: {
        task_id: _this.state.updata_msg.video_id || _this.state.updata_msg._id,
        lang: this.state.lang,
      },
    };
    _this.setState({
      status: 6,
    });
    getData("video/subtitle", _data, "post")
      .then((res) => {
        if (res.result_data[0] && res.result_data[0].subtitling) {
          _this.props.parent.get_url(res.result_data[0]);
          _this.setState({ status: 7, lang: "" });
          alert("生成完成，请点击播放视频可以观看字幕并可以双击字幕编辑");
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
    const { fileName, updata_msg, status } = this.state;
    let _this = this;
    const seleckChange = function(el) {
      _this.setState({
        lang: el.target.value,
      });
    };

    return (
      <div className="section upload-cover ">
        <div className="nav-tabs">
          <p>新建视频</p>
        </div>

        <div className="lists">
          {_this.state.status === 1 ? (
            <section>
              <input
                type="file"
                id="newFile"
                onChange={(e) => {
                  // getData('api/v1/gateway',{
                  //   'model_name':'user',
                  //   "model_action":'is_login',
                  //   'extra_data':{},
                  //   'model_type':''
                  // }).then(res=>{
                  //   console.log(res)
                  // }).catch(err=>{
                  //   console.log(err)
                  // })
                  _this.setState({ status: 2 });
                  let myFile = new UpdataFile({
                    fileId: "newFile",
                    pageObj: _this,
                    url: "http://api.haetek.com:9191/api/v1/gateway",
                    filesSize: e.target.files[0].size,
                    shardSize: 10 * 1024 * 1024, //一个分片大小
                  });
                  myFile.init();
                }}
              />
              <br />
              <p>拖放您要上传的视频</p>
              <p>您的视频在发布之前将处于私享状态</p>
            </section>
          ) : (
            <section></section>
          )}
          {_this.state.status === 2 ? (
            <section>
              <div className="items">
                  <NewLinearProgress
                    variant="determinate"
                    value={this.state.progress}
                  ></NewLinearProgress>
              </div>
            </section>
          ) : (<i></i>)}
                {_this.state.status===3?(
                  <section>
                    <div className="items btn">
                      <span className="edit" title="添加到编辑区">
                        <Create onClick={()=>{
                          getData('api/v1/gateway',{
                            "model_name":"video",
                            "model_action": "generate_thumbnail",
                            "extra_data": {
                            "video_id": video_id
                            },
                            "model_type":""
                          }).then(res=>{

                          }).catch(err=>{

                          })

                        }}/>
                      </span>
                      <span className="del" title="删除">
                        <Delete />
                      </span>
                      <p style={{fontSize:'10px'}}>123456</p>
                    </div>
                    <p style={{width: '120px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}>{_this.state.files[0].name}</p>
                  </section>
                ):(<i></i>)}

          {/*
         

          
            <Button variant="contained"
            color="primary" onClick={()=>{
              let _data={
                  "task_id" : '12123456' 
              }
              getData("video/breakpoint", _data, "post",{
                Authorization:
                "Bearer" +
                " " +
                "J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODgwNjc5NjgsImlhdCI6MTU4ODA1MzU2OCwiaXNzIjoiaGVpZHVua2VqaSIsImRhdGEiOnsiX2lkIjoiMjAyMDA0MjUxNDMyMjM4Mjg4MTUifX0.wJGrBB_VWmQxWRT4g_vvzF7Qy0dS5FL9O-_NKUVG4h4",
                'Content-Type':'multipart/form-data'
            }).then(res=>{
              console.log(res)
            }).catch(err=>{console.log(err)})

            }}> 续传</Button>
*/}
        </div>

        {/* <div>
          <label className="file-label">
            <div
              className="file-input"
              id="filePicker"
              name="resume"
              ref={this.fileInput_chunk}
            >
              <span className="file-label">大文件上传</span>
            </div>

            <br />
          </label>
        
          {status >= 4 ? (
            <div className="updata-img">
              <img src="https://material-ui.com/static/images/avatar/1.jpg" />
              <span>
                <Delete />
              </span>{" "}
              <span>
                <Add />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        {status > 1 && status < 4 ? (
          <span className="file-name">
            <LinearProgress variant="determinate" value={this.state.progress} />
           
          </span>
        ) : (
          <span></span>
        )}

        <br />
        {status == 2 ? (
          <button
            className="button is-info"
            onClick={() => {
              this.uploader.stop(true);
              this.setState({ status: 3 });
            }}
          >
            暂停上传
          </button>
        ) : status == 3 ? (
          <button
            onClick={() => {
              this.uploader.upload();
              this.setState({ status: 2 });
            }}
          >
            继续上传
          </button>
        ) : (
          <span></span>
        )}

        {status == 4 ? (
          <div>
            <span>
              <label>视频语言来源：</label>
              <select name="lang" id="lang" onChange={seleckChange}>
                <option value="">--请选择语言--</option>
                <option value="en">英文 </option>
                <option value="cn">中文</option>
              </select>
            </span>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => _this.new_subtitles()}
            >
              生成字幕
            </Button>
          </div>
        ) : (
          <span></span>
        )}
        {status == 5 ? (
          <Button variant="contained" onClick={_this.query_subtitles}>
            查询字幕
          </Button>
        ) : (
          <span></span>
        )}
        {status == 6 ? (
          <div className="article">
            <div className="Upload-the-article">
              <span></span>
            </div>
            <div>正在生成字幕...</div>
          </div>
        ) : (
          <span></span>
        )}*/}
        <Message
          parent={this}
          msg="您还没有登录，将为您跳转到登录页面！"
        ></Message>
      </div>
    );
  }
}
