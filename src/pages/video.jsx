import React, { Component } from "react";
import Layout from "../layout";
import SliderTemplate from "../components/SliderTemplate/SliderTemplate";
import HeaderTemplate from "../components/Header/Header";
import TopAside from "../components/TopAside/TopAside";
import BottomAside from "../components/BottomAside/BottomAside";
import VideoChilden from "../components/VideoChilden/VideoChilden";
import {Dialog, Button,DialogTitle,Snackbar,IconButton} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import {
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
  Image,
  SkipNext,
  SkipPrevious,
  PlayArrow,
  Pause,
 
} from "@material-ui/icons";
import "../../static/css/video.css";
import getData from "../../static/js/request";
// import FormData from "C:/Users/chen-web/AppData/Local/Microsoft/TypeScript/3.8/node_modules/form-data/index";
const NewDialog = withStyles({
  paperWidthSm: {
    "max-width": "none"
  },
  paperScrollPaper: {
    display: "block",
    padding: "32px"
  }
})(Dialog);
const NewDialogTitle = withStyles({
  root:{
    padding:0
  }
})(DialogTitle)
export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: {},
      the_current: {}, //当前字幕
      status: false, //播放状态
      edi_show: false, //是否调起修改当前字幕弹窗
      is_suc : ''
    };
    this.video_live = null;
    //绑定双击事件
    this.getChildrenMsg = this.getChildrenMsg.bind(this);
    this.get_top_inx = this.get_top_inx.bind(this);
  }
  componentDidMount() {
    this.setState({
      video_h: document.getElementsByClassName("video")[0].clientHeight
    });
    this.get_data();
  }
  componentWillReceiveProps(nextState) {
    return true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  get_data() {
    //请求数据
    let video_data,
      _this = this;

    let _data = (_data = {
      model_action: "search",
      query_string: "",
      type: "global",
      video_ids: []
    });
    getData("videos", _data, "post").then(res => {
      video_data = res.result_data[0];
      let _data = {
        video_data: video_data,
        sub_josn: video_data.subtitling,
        _path: video_data.video_path["720P"]
      };

      _this.setState({
        video_data: _data
      });
    });
  }
  getChildrenMsg(result, msg) {
    //滑块子件传参滑块位置过来，并且更新字幕
    this.video_live.currentTime = msg;
    this.sub_test(msg);
    return;
  }
  get_top_inx(result, value) {
    this.setState({
      top_inx: value
    });
  }

  sub_test(time) {
    //更新字幕
    if (!this.state.video_data.sub_josn || time <= 0) {
      return;
    }
    let json_sub = this.state.video_data.sub_josn;

    let _data = {};
    for (let i = 0; i < json_sub.length; i++) {
      if (time >= json_sub[i].bg && time <= json_sub[i].ed) {
        _data = {
          zh: json_sub[i].cn_sub,
          en: json_sub[i].en_sub,
          time: time,
          inx: i
        };
      }
      if (json_sub[i + 1]) {
        if (time > json_sub[i].ed && time < json_sub[i + 1].bg) {
          _data = { zh: "", en: "", time: time, inx: i };
        }
      } else {
        if (time > json_sub[i].ed) {
          _data = { zh: "", en: "", time: time, inx: i };
        }
      }
    }

    if (this.video_live.duration) {
      _data.video_len = this.video_live.duration;
    }
    this.setState({
      the_current: _data
    });
  }
  render() {
    const _this = this;
    const { video_data } = this.state;
    const on_ply = function() {
      //播放
      if (!_this.state.video_data._path) {
        return;
      }
      if (_this.video_live.currentTime === 0) {
        _this.video_live.load();
      }
      _this.video_live.play();
      _this.setState({
        status: true
      });
    };
    const on_pause = function() {
      //暂停
      _this.video_live.pause();
      _this.setState({
        status: false
      });
    };
    const time_date = function(el) {
      //实时播放时间
      let time = el.target.currentTime;
      _this.sub_test(time);
    };
    const on_end = function() {
      //播放结束
      on_pause();
    };
    const double_click = function(el) {
      // 双击修改字幕
    
      el.preventDefault();
      _this.setState({
        lu: el.target.dataset.lu,//修改语言
        sub_inx: parseFloat(el.target.dataset.inx)//修改条目
      });
      on_pause();
      handleOpen();
    };
    const handleClose = function() {//取消编辑
     
      _this.setState({
        edi_show: false
      });
    };
    const handleOpen = function() {//打开编辑
     
      _this.setState({
        edi_show: true
      });
    };
    const handleServer=function(){//保存编辑
      let _the_data = _this.state.the_current,//当前，
          _video_data = _this.state.video_data,//所有
          _lu = _this.state.lu,
          _inx = _this.state.sub_inx;
      let _v = document.querySelector('#newTest').value;
        if(_lu=='zh'){
          _the_data.zh = _v;
          _video_data.sub_josn[_inx].cn_sub=_v;
        }else{
          _the_data.en = _v;
          _video_data.sub_josn[_inx].en_sub = _v;
        }
        let r_data = {
            "model_action": "update",
            "extra_data": {
            "subtitling": _video_data.sub_josn,
            "task_id": _video_data.video_data.video_id,// task_id,
            "lang":'en'
            }  
        }
        getData("video/subtitle", r_data, "post").then(res => {

         
          handleClose();
          _this.setState({
               the_current:_the_data,
               video_data:_video_data,
               is_suc:"修改成功"
             })
             setTimeout(()=>{_this.setState({is_suc:''})},3000)
        
        }).catch(err=>{
          _this.setState({
            is_suc:"修改失败"
          })
          setTimeout(()=>{_this.setState({is_suc:''})},3000)
          console.log(err)
        })
       
    }
    return (
      <Layout>
        <div className="el-container is-vertical">
          <header className="el-header">
            <HeaderTemplate />
          </header>
          <main className="el-main top">
            <section className="el-container">
              <aside className="el-aside">
                <TopAside parent={this} />
              </aside>
              <main className="el-main">
                <div>
                  <div>
                    <VideoChilden topInx={this.state.top_inx || 1} />
                  </div>
                </div>
                <div>
                  <div className="video">
                    <video
                      poster="http://seeker.haetek.com/houseonline/images/271581231610pic_hd13.png"
                      height={this.state.video_h}
                      ref={node => (this.video_live = node)}
                      onTimeUpdate={time_date}
                      onEnded={on_end}
                    >
                      <source
                        src={
                          "http://seeker.haetek.com:9191/" + video_data._path
                        }
                      ></source>
                    </video>
                    <div className="video-test subtitles">
                      <p>
                        <span data-lu="zh" onDoubleClick={double_click} data-inx={_this.state.the_current.inx}>
                          {_this.state.the_current ? _this.state.the_current.zh : ""}
                        </span>
                      </p>
                      <p>
                        <span data-lu="en" onDoubleClick={double_click} data-inx={_this.state.the_current.inx}>
                        {_this.state.the_current? _this.state.the_current.en: ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p>
                    <span>
                      <SkipPrevious />

                      {this.state.status ? (
                        <Pause onClick={on_pause} />
                      ) : (
                        <PlayArrow onClick={on_ply} />
                      )}

                      <SkipNext />
                    </span>
                    <span>
                      {_this.state.the_current
                        ? _this.state.the_current.time
                        : 0}
                      /
                      {_this.state.the_current
                        ? _this.state.the_current.video_len
                        : 0}
                    </span>
                  </p>
                </div>
              </main>
            </section>
          </main>
          <div className="slider">
            <div className="left">
              <div>
                <SubdirectoryArrowLeft />
              </div>
              <div>
                <SubdirectoryArrowRight />
              </div>
            </div>
            <div className="right">
              <SliderTemplate
                value={this.state.the_current.time || 0}
                parent={this}
                length={
                  this.state.the_current ? this.state.the_current.video_len : 0
                }
              />
            </div>
          </div>
          <footer className="el-footer bottom clearfix">
            <section className="el-container">
              <aside className="el-aside">
                <BottomAside />
              </aside>
              <main className="el-main">
                <div className="video-img">图片</div>
                <div className="video-image">
                  <Image />
                </div>
                <div className="video-test">
                  <p>
                    <span data-lu="zh" onDoubleClick={double_click} data-inx={_this.state.the_current.inx}>
                      {_this.state.the_current ? _this.state.the_current.zh : ""}
                    </span>
                  </p>
                  <p>
                    <span data-lu="en" onDoubleClick={double_click} data-inx={_this.state.the_current.inx}>
                     {_this.state.the_current? _this.state.the_current.en: ""}
                    </span>
                  </p>
                 <NewDialog  onClose={handleClose} open={_this.state.edi_show}>
                      <NewDialogTitle>编辑当前字幕</NewDialogTitle>
                      <form action="">
                        <textarea name="newTest" id="newTest" defaultValue={_this.state.lu=='zh'?_this.state.the_current.zh:_this.state.the_current.en}  cols="50" rows="5"></textarea>
                      </form>
                        <Button variant="contained" onClick={handleClose}>取消</Button>
                        <Button onClick={handleServer} variant="contained" color="primary">保存</Button>
                       
                 </NewDialog>


                 <Snackbar
                  anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'center',
                 }}
                 open={_this.state.is_suc?true:false}
                 autoHideDuration={3000}
                 message={_this.state.is_suc}
               > 
             </Snackbar>
               
                </div>
              </main>
            </section>
          </footer>
        </div>
      </Layout>
    );
  }
}
