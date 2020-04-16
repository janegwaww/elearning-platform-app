import React, { createRef, Component } from "react";
import WebUpload from "webuploader";
import axios from "axios";
import "./Uploader.css";
import { Button, LinearProgress } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import getData from "../../../assets/js/request";

export default class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileName_chunk: "",
      progress: 0,
      updata_msg: null,
      status: 1 //2.暂停上传，3.继续上传，4,生成字幕，5.查询字幕，
    };
    this.fileInput = createRef();
    this.fileInput_chunk = createRef();
    this.new_subtitles = this.new_subtitles.bind(this);
    this.query_subtitles = this.query_subtitles.bind(this);
  }
  componentDidMount() {
    this.createUploader();
  }
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.setState({ fileName: this.fileInput.current.files[0].name });
  //   let file = this.fileInput.current.files[0];
  //   let formData = new FormData();
  //   formData.append(file.name, file);
  //   axios({
  //     url: "http://seeker.haetek.com:9191",
  //     method: "post",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     data: formData
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  // async getHash() {
  //   const res = await axios.post("http://192.168.0.180:6869/breakpoint", {
  //     task_id: ""
  //   });
  //   return await res.data;
  // }
  beforeSend() {
    WebUpload.Uploader.register(
      {
        "before-send": "checkchunk"
      },
      {
        checkchunk: block => {
          var blob = block.blob.getSource();
          let deferred = WebUpload.Deferred();
          this.setState({
            status: 2
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
        }
      }
    );
  }
  createUploader = () => {
    let _this = this;
    let task_id = WebUpload.Base.guid();
    this.beforeSend();
    this.uploader = WebUpload.create({
      server: "http://seeker.haetek.com:9191/video/upload",
      auto: true,
      chunked: true,
      chunkedSize: 20 * 1024 * 1024,
      chunkRetry: 10,
      threads: 1,
      duplicate: true,
      formData: {
        task_id: task_id,
        video_type: "mp4",
        name1: "mp4"
      },
      accept: {
        title: "video",
        extensions: "mp4",
        mimeTypes: "video/*"
      },
      pick: "#filePicker"
    });

    this.uploader.on("uploadComplete", function(file) {});
    this.uploader.on("uploadSuccess", (file, res) => {
      if (res.err == 0) {
        _this.setState({
          updata_msg: res.result_data[0],
          status: 4
        });

        _this.props.parent.get_url(res.result_data[0]);

        alert("上传成功！");

        //_this.new_subtitles(); //生成字幕
      }
    });
    this.uploader.on("uploadError", function(file) {
      console.log("error: ", file);
    });
    this.uploader.on("uploadProgress", pro => {
      this.setState({
        progress: parseInt(100 - pro.remaning * (100 / pro.blocks.length), 10)
      });
    });
  };

  new_subtitles(str) {
    if(!this.state.lang){
      alert('请选择来源');
      return
    }
    let _this = this;
    // if(!updata_msg.video_id){alert("video_id 不能为空");return}
    let _data = {
      model_action: "generate",
      extra_data: {
        task_id: _this.state.updata_msg.video_id || _this.state.updata_msg._id,
        lang: this.state.lang
      }
    };
    this.setState({
      status: 5
    });
    getData("video/subtitle", _data, "post")
      .then(res => {
        _this.query_subtitles(); //查询是否生成字幕
        // console.log("成功", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  query_subtitles() {
    
    let _this = this;
    let _data = {
      model_action: "query",
      extra_data: {
        task_id: _this.state.updata_msg.video_id || _this.state.updata_msg._id,
        lang: this.state.lang
      }
    };
    _this.setState({
      status: 6
    });
    getData("video/subtitle", _data, "post")
      .then(res => {
        if (res.result_data[0] && res.result_data[0].subtitling) {
          _this.props.parent.get_url(res.result_data[0]);
          _this.setState({ status: 7 ,lang:''});
          alert("生成完成，请点击播放视频可以观看字幕并可以双击字幕编辑");
          return;
        } else {
          setTimeout(() => {
            _this.query_subtitles();
          }, 9000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { fileName, updata_msg, status } = this.state;
    let _this = this;
    const seleckChange = function(el){

      _this.setState({
        lang:el.target.value
      })
      
    }

    return (
      <div className="section upload-cover ">
        <div className="nav-tabs">
          <p>新建视频</p>
        </div>
        <div>
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
            {/*<progress
              className="progress is-primary"
              value={`${this.state.progress}`}
              max="100"
            >
              {this.state.progress}
            </progress>
            */}
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
              <label >视频语言来源：</label>
              <select name="lang" id='lang' onChange={seleckChange} >
                <option value=''>--请选择语言--</option>
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
        )}
      </div>
    );
  }
}
