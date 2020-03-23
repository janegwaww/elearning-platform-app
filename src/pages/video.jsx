import React, { Component } from "react";
import Layout from "../layout";

import HeaderTemplate from "../components/Header/Header";
import TopAside from "../components/TopAside/TopAside";
import BottomAside from '../components/BottomAside/BottomAside';
import '../../static/css/video.css';
export default class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className='el-container is-vertical'>
          <header className='el-header'>
            <HeaderTemplate />
          </header>
          <main className='el-main top'>
            <section className='el-container'>
              <aside className='el-aside'> 
                <TopAside />
              </aside>
              <main className='el-main'>上右</main>
            </section>

          </main>
          <footer className='el-footer bottom'>
            <section className='el-container'>
              <aside className='el-aside'> 
              <BottomAside />
              </aside>
              <main className='el-main'>下右</main>
            </section>
          </footer>

        </div>

        {/* <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container> */}



      </Layout>
    );
  }
}