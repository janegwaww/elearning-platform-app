import React, { Component } from "react";
import Layout from "../layout";
import SliderTemplate from "../components/SliderTemplate/SliderTemplate";
import HeaderTemplate from "../components/Header/Header";
import TopAside from "../components/TopAside/TopAside";
import BottomAside from "../components/BottomAside/BottomAside";
import VideoChilden from "../components/VideoChilden/VideoChilden";

import {
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
  Image,
  SkipNext,
  SkipPrevious,
  PlayArrow,
  Pause
} from "@material-ui/icons";
import "../../static/css/video.css";
import getData from "../../static/js/request";

export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: {},
      the_current: {}, //当前字幕
      status: false //播放状态
    };
    this.video_live = null;
    //绑定双击事件
    this.double_click = this.double_click.bind(this);
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
    //
    // 子件传参上来
    this.setState({
      value: msg
    });
  }
  get_top_inx(result, value) {
    this.setState({
      top_inx: value
    });
  }

  double_click(el) {
    // 点击修改字幕
    this.setState({
      value: parseFloat(el.target.dataset.id)
    });
  }
  sub_test = function(time) {
    if(!this.state.video_data.sub_josn){return};
    let json_sub = this.state.video_data.sub_josn;
    
    let _data;
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
    if(this.video_live.duration&&!this.state.the_current.video_len){
      _data.video_len= this.video_live.duration
    }
    console.log(_data)
    this.setState({
      the_current: _data
    });
  };
  render() {
    const _this = this;
    const { video_data } = this.state;
    const on_ply = function() {
      if(!_this.video_data._path){return};
      if (_this.video_live.currentTime === 0) {
        _this.video_live.load();
      }
      _this.video_live.play();
      _this.setState({
        status: true
      });
    };
    const on_pause = function() {
      _this.video_live.pause();
      _this.setState({
        status: false
      });
    };
    const time_date = function(el) {
      let time = el.target.currentTime;
     
      _this.sub_test(time);
    };
    const play_pause = function(status) {
      if (status) {
        return <Pause onClick={on_pause} />;
      } else {
        return <PlayArrow onClick={on_ply} />;
      }
    };

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
                    <video poster="http://seeker.haetek.com/houseonline/images/271581231610pic_hd13.png"
                      height={this.state.video_h}
                      ref={node => (this.video_live = node)}
                      onTimeUpdate={time_date}
                    >
                      <source
                        src={
                          "http://seeker.haetek.com:9191/" + video_data._path
                        }
                      ></source>
                    </video>
                  </div>
                  <p>
                  <span>
                    <SkipPrevious />
                    {play_pause(this.state.status)}
                    <SkipNext />
                    </span>
                    <span>
                      {_this.state.the_current
                        ? _this.state.the_current.time
                        : 0}
                      /{_this.state.the_current?_this.state.the_current.video_len:0}
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
              <SliderTemplate value={this.state.value || 0} parent={this} />
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
                    <span data-lu="zh" onDoubleClick={this.double_click}>
                     {_this.state.the_current?_this.state.the_current.zh:''}
                    </span>
                  </p>
                  <p>
                    <span data-lu="en" onDoubleClick={this.double_click}>
                      {_this.state.the_current?_this.state.the_current.en:''}
                    </span>
                  </p>
                </div>
              </main>
            </section>
          </footer>
        </div>
      </Layout>
    );
  }
}
