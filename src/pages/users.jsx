import React from "react";
import { Router } from "@reach/router";
import Profile from "../components/Profile/Profile";
import Login from "../components/Auth/Login";
import Default from "../components/Default/Default";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import WorksCenter from '../components/Profile/ProfileChildens/workscenter/WorksCenter';
import Series from '../components/Profile/ProfileChildens/workscenter/Series';
import Video from '../components/Profile/ProfileChildens/workscenter/Video';
import Draft from '../components/Profile/ProfileChildens/workscenter/Draft';
import SeriesDetail from '../components/Profile/ProfileChildens/workscenter/SeriesDetail';
import PageIndex from '../components/Profile/ProfileChildens/pageindex/PageIndex';
import Dynamic from '../components/Profile/ProfileChildens/dynamic/Index';
import Setings from '../components/Profile/ProfileChildens/setings/Index'

const Users = () => {
  return (
    <Router basepath="/users">
      <PrivateRoute path="/profile" component={Profile} >
          <PageIndex path='/' />
          <Dynamic path='/dynamic' />
          <Setings path='/setings' />
          <WorksCenter path='/workscenter' >
            <Video path='/' />
            <Draft path ='/draft'/>
            <Series path='/series' />
            <SeriesDetail path='/seriesdetail'/>
          </WorksCenter>

      </PrivateRoute>
      <Login path="/login" />
      <Default path="/" />
     
    
    </Router>
  );
};

export default Users;
