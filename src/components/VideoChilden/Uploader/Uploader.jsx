import React, { createRef, Component } from "react";
import WebUpload from "webuploader";
import axios from "axios";
import "./Uploader.css";
import { Button } from "@material-ui/core";
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
          status:4
        });
      
        _this.props.parent.get_url(res.result_data[0]);
        alert("上传成功！");
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
  render() {
    const { fileName, updata_msg, status } = this.state;
    let _this = this;
    const new_subtitles = function() {
   
      // if(!updata_msg.video_id){alert("video_id 不能为空");return}
      let _data = {
        model_action: "generate",
        extra_data: {
          task_id: updata_msg.video_id||updata_msg._id,
          lang: "en"
        }
      };
      _this.setState({
        status:5
      });
      getData("video/subtitle", _data, "post")
        .then(res => {
          console.log("成功", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    };
    const query_subtitles = function() {
      let _data = {
        model_action: "query",
        extra_data: {
          task_id: updata_msg.video_id||updata_msg._id,
          lang: "cn"
        }
      };
      _this.setState({
        status:1
      })
      getData("video/subtitle", _data, "post")
        .then(res => {
          
          if (res.result_data[0] && res.result_data[0].subtitling) {
            _this.props.parent.get_url(res.result_data[0]);
            return;
          } else {
            alert("字幕正在生成！");
            setTimeout(() => {
              query_subtitles();
            }, 10000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <div className="section upload-cover ">
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
        {status > 1 &&status<4? (
          <span className="file-name">
            <progress
              className="progress is-primary"
              value={`${this.state.progress}`}
              max="100"
            >
              {this.state.progress}
            </progress>
          </span>
        ) : (
          <span></span>
        )}

        <br />
        {status==2?(<button
          className="button is-info"
          onClick={() => {this.uploader.stop(true);this.setState({status:3})}}
        >
          暂停上传
        </button>):status==3?(<button onClick={() =>{ this.uploader.upload();this.setState({status:2})}}>继续上传</button>):(<span></span>)}
        
        
        {status==4 ? (
          <Button variant="contained" color="primary" onClick={new_subtitles}>
            生成字幕
          </Button>
        ) : (
          <span></span>
        )}
        {status==5?(<Button variant="contained" onClick={query_subtitles}>
        查询字幕
      </Button>):(<span></span>)}
        
      </div>
    );
  }
}
