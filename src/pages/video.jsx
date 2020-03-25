import React, { Component } from "react";
import Layout from "../layout";

import SliderTemplate from "../components/SliderTemplate/SliderTemplate";
import HeaderTemplate from "../components/Header/Header";
import TopAside from "../components/TopAside/TopAside";
import BottomAside from "../components/BottomAside/BottomAside";
import { SubdirectoryArrowLeft,SubdirectoryArrowRight } from "@material-ui/icons";

import "../../static/css/video.css";

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
                  <p>按钮</p>
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
              <SliderTemplate  state={5}/>
            </div>
          </div>
          <footer className="el-footer bottom clearfix">
         
            <section className="el-container">
              <aside className="el-aside">
                <BottomAside />
              </aside>
              <main className="el-main">下右</main>
            </section>
          </footer>
        </div>
      </Layout>
    );
  }
}
