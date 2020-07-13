import React from "react";
import { Router } from "@reach/router";
import Profile from "../components/Profile/Profile";
import Login from "../components/Auth/Login";
import Default from "../components/Default/Default";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import WorksCenter from '../components/Profile/page/workscenter/Index';
import Series from '../components/Profile/page/workscenter/Series';
import Video from '../components/Profile/page/workscenter/Video';
import Draft from '../components/Profile/page/workscenter/Draft';
import SeriesDetail from '../components/Profile/page/workscenter/SeriesDetail';
import PageIndex from '../components/Profile/page/pageindex/Index';
import Dynamic from '../components/Profile/page/dynamic/Index';
import Collection from '../components/Profile/page/dynamic/collection';
import History from '../components/Profile/page/dynamic/history';
import Setings from '../components/Profile/page/setings/Index'

const Users = () => {
  return (
    <Router basepath="/users">
      <PrivateRoute path="/profile" component={Profile} >
          <PageIndex path='/' />
      
           <Dynamic path='/dynamic' >
            <Collection path='/' />
            <History path = '/history' />
           </Dynamic>
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
