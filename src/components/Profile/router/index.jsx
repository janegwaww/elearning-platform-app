


import React from "react";
import { Router } from "@reach/router";
import ProfileIndex from "../ProfileChildens/index";
import MsgCenter from '../ProfileChildens/MsgCenter';


const PageRouter = () => {
  return (
    <Router basepath="/users/profile">
      
    <ProfileIndex path="/" component={ProfileIndex} />
    <MsgCenter path="/msgcenter" component={MsgCenter}  />
      {/*<Login path="/login" />
  <Default path="/" />*/}
    </Router>
  );
};

export default PageRouter;
