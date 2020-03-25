import React, { Component } from "react";
import Layout from "../layout";

import SliderTemplate from "../components/SliderTemplate/SliderTemplate";
import HeaderTemplate from "../components/Header/Header";
import TopAside from "../components/TopAside/TopAside";
import BottomAside from "../components/BottomAside/BottomAside";

import { SubdirectoryArrowLeft,SubdirectoryArrowRight,Image ,SkipNext,SkipPrevious,PlayArrow} from "@material-ui/icons";
import "../../static/css/video.css";
import getData from '../../static/js/request';

getData()
export default class AboutPage extends Component {
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
                <TopAside />
              </aside>
              <main className="el-main">
                <div>
                  <div>上传文件</div>
                </div>
                <div>
                  <div>视频</div>
                  <p >
                    <SkipPrevious /> 
                    <PlayArrow />
                    <SkipNext />
                    <span>00:00:00</span>
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
              <SliderTemplate />
            </div>
          </div>
          <footer className="el-footer bottom clearfix">
         
            <section className="el-container">
              <aside className="el-aside">
                <BottomAside />
              </aside>
              <main className="el-main">
                <div className='video-img'>图片</div>
                <div className='video-image'><Image /></div>
                <div className='video-test'>
                  <span>我是字幕呀 字幕呀 双击你修改</span>
                  <span>我是字幕呀 字幕呀 双击你修改</span>
                  <span>我是字幕呀 字幕呀 双击你修改</span>
                </div>
              </main>
            </section>
          </footer>
        </div>
      </Layout>
    );
  }
}
