import React, { createRef, Component } from "react";
import WebUpload from "webuploader";
import axios from "axios";
import "./Uploader.css";
export default class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileName_chunk: "",
      progress: 0
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
      pick: "#filePicker"
    });
  
    this.uploader.on("uploadComplete", function(file) {
      
      
      // alert("上传完成！");
    });
    this.uploader.on('uploadSuccess',(file,res)=>{
      
      if(res.err==0){
        _this.props.parent.upFile_get_url(res.result_data[0]);
        alert('上传成功！')
      }
    })
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
    const { fileName } = this.state;
    
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
        <span className="file-name">
          <progress
            className="progress is-primary"
            value={`${this.state.progress}`}
            max="100"
          >
            {this.state.progress}
          </progress>
        </span>
        <br />
        <button
          className="button is-info"
          onClick={() => this.uploader.stop(true)}
        >
          暂停上传
        </button>
        <button onClick={() => this.uploader.upload()}>继续上传</button>
      </div>
    );
  }
}
