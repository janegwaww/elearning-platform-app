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
  PlayArrow
} from "@material-ui/icons";
import "../../static/css/video.css";
//import getData from "../../static/js/request";


export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //绑定双击事件
    this.double_click = this.double_click.bind(this);
    this.getChildrenMsg = this.getChildrenMsg.bind(this);
    this.get_top_inx = this.get_top_inx.bind(this);
  }
  componentDidMount(){
    this.setState({
      video_h:document.getElementsByClassName('video')[0].clientHeight
    })
    
  }
  getChildrenMsg(result, msg) {//
    // 子件传参上来
    this.setState({
      value: msg
    });
  }
  get_top_inx(result,value){
   
    this.setState({
      top_inx:value
    })
  }

  double_click(el) {
    // 点击修改字幕
    this.setState({
      value: parseFloat(el.target.dataset.id)
    });
  }
  render() {
    return (
      <Layout>
        <div className="el-container is-vertical">
          <header className="el-header">
            <HeaderTemplate />
          </header>
          <main className="el-main top">
            <section className="el-container">
              <aside className="el-aside">
                <TopAside  parent={this} />
              </aside>
              <main className="el-main">
                <div>
                  <div><VideoChilden  topInx={this.state.top_inx || 1}/></div>
                </div>
                <div>
                  <div className='video'>
                 
                    <video crossOrigin="anonymous"  height={this.state.video_h}>
                    <source src="http://seeker.haetek.com:9191/static/upload/2020032614143782.mp4" type="video/mp4"></source>
                    </video>
                  </div>
                  <p>
                    <SkipPrevious />
                    <PlayArrow />
                    <SkipNext />
                    <span>00:00:00 // </span>
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
                  <span data-id={5} onDoubleClick={this.double_click}>
                    我是字幕呀 字幕呀 双击你修改
                  </span>
                  <span data-id={30} onDoubleClick={this.double_click}>
                    我是字幕呀 字幕呀 双击你修改
                  </span>
                  <span data-id={60} onDoubleClick={this.double_click}>
                    我是字幕呀 字幕呀 双击你修改
                  </span>
                </div>
              </main>
            </section>
          </footer>
        </div>
      </Layout>
    );
  }
}
