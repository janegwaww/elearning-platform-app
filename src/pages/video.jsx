import React from "react";
import { Router } from "@reach/router";

import Default from "../components/VideoChilden/VideoIndex";
import UpVideoPage from '../components/VideoChilden/UpPage/upPage';
import UpText from '../components/VideoChilden/UpText/UpText';
import '../assets/css/tootls.css';
import '../assets/css/container.css';


const Video = () => {
  return (
    <Router basepath="/video">
      <UpVideoPage path="/uppage"  />
      <UpText path='/uptext' />
      <Default path="/" />
    </Router>
  );
};

export default Video;