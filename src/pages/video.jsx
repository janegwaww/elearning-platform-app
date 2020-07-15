import React from "react";
import { Router } from "@reach/router";

import Default from "../components/VideoChilden/VideoIndex";
import UpVideoPage from '../components/VideoChilden/UpPage/upPage';
// import '../assets/css/modal.css';

const Video = () => {
  return (
    <Router basepath="/video">
      <UpVideoPage path="/uppage"  />
      <Default path="/" />
    </Router>
  );
};

export default Video;