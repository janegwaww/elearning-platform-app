import React from "react";
import { Router } from "@reach/router";
import Profile from "../components/Profile/Profile";
import Login from "../components/Auth/Login";
import Default from "../components/Default/Default";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import WorksCenter from "../components/Profile/page/workscenter/Index"; //创作中心
import Series from "../components/Profile/page/workscenter/Series";
import Video from "../components/Profile/page/workscenter/Video";
import Draft from "../components/Profile/page/workscenter/Draft";
import SeriesDetail from "../components/Profile/page/workscenter/SeriesDetail";
import PageIndex from "../components/Profile/page/pageindex/Index"; //个人中心
import Dynamic from "../components/Profile/page/dynamic/Index"; //动态
import Collection from "../components/Profile/page/dynamic/collection";
import History from "../components/Profile/page/dynamic/history";
import Setings from "../components/Profile/page/setings/Index"; //设置中心
import Help from '../components/Profile/page/setings/Help';
import Safety from '../components/Profile/page/setings/Safety';
import Basic from '../components/Profile/page/setings/Basic';
import SetingsPhone from '../components/Profile/page/setings/SetingsPhone';

const Users = () => {
  return (
    <Router basepath="/users">
      <PrivateRoute path="/profile" component={Profile}>
        <PageIndex path="/" />

        <Dynamic path="/dynamic">
          <Collection path="/" />
          <History path="/history" />
        </Dynamic>
        <Setings path="/setings" >
          <Basic path='/' />
          <Help path='/help' />
          <Safety path= '/safety' />
        </Setings>
        <SetingsPhone path='/setingsphone' />
        <WorksCenter path="/workscenter">
          <Video path="/" />
          <Draft path="/draft" />
          <Series path="/series" />
          <SeriesDetail path="/seriesdetail" />
        </WorksCenter>
      </PrivateRoute>
      <Login path="/login" />
      <Default path="/" />
    </Router>
  );
};

export default Users;
