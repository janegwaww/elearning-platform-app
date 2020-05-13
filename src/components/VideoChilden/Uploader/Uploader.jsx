import React, { createRef, Component } from "react";
import WebUpload from "webuploader";
import axios from "axios";
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
import { Delete, Add, Create } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import getData from "../../../assets/js/request";
import { getUser, isLoggedIn } from "../..//../services/auth";
import UpdataFile from "../../../assets/js/updataFile";
import Message from "./Message";
import Message1 from "./Message1";
import { navigate } from "@reach/router";
import { getObj } from "../../../assets/js/totls";
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
const  Dynamic = withStyles({
  root: {
    position: "absolute",
    bottom: "10px",
    left: 0,
  }
})(LinearProgress)
export default class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileName_chunk: "",
      progress: 0,
      updata_msg: null,
      status: 1, //2.上传，3.上传完成未来编辑，4,生成字幕，5.，
      dialogOpen: false,
      promptOpen: false,
      promp_info: {
        title: "温馨提示",
        msg: "请登录",
        type: 1,
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
   
    let _data  = this.props.parent.props.parent.state.video_data;
     
      if(_data.video_id){
        this.setState({
          status:3,
          files:[_data]
        })
      }
    if (getUser().name) {
      this.setState({
        user_info: getUser(),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.parent.props.parent.state.uploadStatus === 4) {
      this.setState({
        status: 4,
      });
      nextProps.parent.props.parent.setState({
        uploadStatus:0
      })

    }
  }
  

  new_subtitles(str) {//获取新的字幕
    if (!this.state.lang_value) {
      alert("请选择视频的语言");
      return;
    }
    let _this = this;
    let _data = {
      "model_name":"video",
      "model_action":"generate_subtitle",
      
      extra_data:{
        "task_id": this.state.files[0]._id||this.state.files[0].video_id,
        lang:this.state.lang_value,
        },
        "model_type":"", 
    };
    this.setState({
      status: 5,
    });
   
   
    getData("api/v1/gateway", _data, "post")
      .then((res) => {
        _this.query_subtitles(); //查询是否生成字幕
        console.log("成功", res);
      })
  }
  query_subtitles() {
    let _this = this;
    let _data = {
      "model_name":"video",
      "model_type":"",
      model_action: "query_subtitle",
      extra_data: {
        task_id:this.state.files[0]._id||this.state.files[0].video_id
      },
    };
    // _this.setState({
    //   status: 3,
    // });
    getData("api/v1/gateway", _data, "post")
      .then((res) => {
        if(res.err==4104){
          navigate(`users/login`);
          return
        }
        if (res.result_data[0] && res.result_data[0].subtitling) {
          _this.props.parent.get_url(res.result_data[0]);

          _this.setState({ status: 3, lang_value: "" });
          let json_sub = res.result_data[0].subtitling;
          let total_time =_this.props.parent.props.parent.state.the_current.video_len;
          let test_arr = [];
          let total_w = getObj('sliderbox').scrollWidth;
         
          
         
          console.log(total_time*1000/total_w)//每px占的毫秒
          for(let i=0;i<json_sub.length;i++){
            if(i===0){

            test_arr.push(<div className="test-nodes" key={i} 
            style={{width:((json_sub[i].ed-json_sub[i].bg)*1000)*(total_w/(total_time*1000))+'px',
            marginLeft:total_w/total_time/1000*json_sub[i].bg*1000+'px' }}>
              <p  onBlur={_this.props.parent.props.parent.context_blur}  suppressContentEditableWarning="true"
              onFocus={_this.props.parent.props.parent.context_focus}
              data-lu='zh' data-inx={i} contentEditable='true'  title='点击文字可编辑' >{json_sub[i].cn_sub}
              </p>
              <p data-lu='en' onBlur={_this.props.parent.props.parent.context_blur}  suppressContentEditableWarning="true"
              onFocus={_this.props.parent.props.parent.context_focus} data-inx={i} contentEditable='true' title='点击文字可编辑' >{json_sub[i].en_sub}</p>
              </div>
              )
            }else{
              test_arr.push(<div className="test-nodes" key={i} 
            style={{width:((json_sub[i].ed-json_sub[i].bg)*1000)*(total_w/(total_time*1000))+'px',
            marginLeft:total_w/total_time/1000*(json_sub[i].bg-json_sub[i-1].ed)*1000+1+'px' }} >
            <p contentEditable='true'  data-lu='zh' data-inx={i} onBlur={_this.props.parent.props.parent.context_blur}  suppressContentEditableWarning="true"
            onFocus={_this.props.parent.props.parent.context_focus}  title='点击文字可编辑' >{json_sub[i].cn_sub}
              </p>
              <p data-lu='en' data-inx={i} onBlur={_this.props.parent.props.parent.context_blur}  suppressContentEditableWarning="true"
              onFocus={_this.props.parent.props.parent.context_focus} contentEditable='true'  title='点击文字可编辑' >{json_sub[i].en_sub}</p>
              </div>)
            }
          }
          
          _this.props.parent.props.parent.setState({
            test_arr:test_arr
          })
          
          
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
  gopage(url) {}

  render() {
    const { fileName, updata_msg, status, lang_value, lang_open } = this.state;
    let _this = this;

    // const seleckChange = function(el) {
    //   _this.setState({
    //     lang: el.target.value,
    //   });
    // };

    return (
      <div className="section upload-cover ">
        <div className="nav-tabs">
          <p>新建视频</p>
        </div>

        <div className="lists">
          {/*{_this.state.status === 1 ? (*/}
          <section>
            <label
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isLoggedIn()) {
                  _this.setState({
                    dialogOpen: true,
                  });
                  return false;
                }
                getData("api/v1/gateway", {
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
                      localStorage.removeItem('haetekUser');
                      _data.msg = "登录超时，正在为你跳转登录页...";
                      _this.setState({
                        promp_info: _data,
                        promptOpen: true,
                      });
                      setTimeout(() => {
                        _this.setState({
                          promptOpen: false,
                        });
                        navigate(`users/login`);
                      }, 3000);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                return false;
              }}
            >
              选择文件
            </label>
            <input
              type="file"
              id="newFile"
              onChange={(e) => {
                //
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
          {/*} ) : (
            <section></section>
         )}*/}
          {status === 2 || status===5? (
            <section>
              <div className="items">
              {status===5?(
                <div style={{padding:'10px 0'}}>
                <LinearProgress />
                <p>正在生成生字幕，请稍后...</p>
                </div>
                ):(
                <NewLinearProgress
                  variant="determinate"
                  value={this.state.progress}
                ></NewLinearProgress>
                )}
              </div>
            </section>
          ) : (
            <i></i>
          )}
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
                     
                      getData("api/v1/gateway", {
                        //生成图片
                        model_name: "video",
                        model_action: "generate_thumbnail",
                        extra_data: {
                          video_id: _this.state.files[0]._id||this.state.files[0].video_id,
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
                <span className="del" title="删除">
                  <Delete />
                </span>
                <p style={{ fontSize: "10px" }}>123456</p>
              </div>
              <p
                style={{
                  width: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {_this.state.files[0]._id||_this.state.files[0].video_id}
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
        </div>

        {/* 
          

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
          msg="您还没有登录，是否跳转到登录页面？"
        ></Message>
        <Message1
          parent={this}
          open={this.state.promptOpen}
          msg={this.state.promp_info}
        />
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
            <Button variant="contained"
              onClick={() => {
                _this.setState({ lang_open: false });
              }}
            >
              取消
            </Button>
            <Button variant="contained" color="primary"
              onClick={() => {
                _this.setState({ lang_open: false });
                _this.new_subtitles()
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
