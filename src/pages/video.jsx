import React from "react";
import { Router } from "@reach/router";

import Default from "../components/VideoChilden/VideoIndex";
import UpVideoPage from '../components/VideoChilden/UpPage/upPage';
import UpText from '../components/VideoChilden/UpText/UpText';
import ZhiqingText from '../components/VideoChilden/zhiqing/ZhigingText';
import ZhiqingVideo from '../components/VideoChilden/zhiqing/ZhigingVideo';
import '../assets/css/tootls.css';
import '../assets/css/container.css';
import "../components/VideoChilden/components/textStyle.css";


const Video = () => {
  return (
    <Router basepath="/video">
      <UpVideoPage path="/uppage"  />
      <UpText path='/uptext' />
      <Default path="/" />
       <ZhiqingText path = '/zhiqingtext' />
       <ZhiqingVideo path='/zhiqingvideo' />
    </Router>
  );
};

export default Video;