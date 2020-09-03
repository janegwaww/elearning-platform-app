import React from 'react';
import { Router } from "@reach/router";
import DefaulePage from '../components/activity/page/index';
import PageIndex from '../components/activity/page/pageinx';
import PageDetail from '../components/activity/page/pagedetail';
import PageAbout from '../components/activity/page/pageabout';
import PageAllWorks from '../components/activity/page/pageallworks';
import '../assets/css/tootls.css';


const Activity = () => {
    return (
      <Router basepath="/activity">
        <DefaulePage path='/' >
          <PageIndex path='/'/>
          <PageDetail path='/detail' />
          <PageAbout path='/about' />
          <PageAllWorks path='/allworks' />
        </DefaulePage>
      </Router>
    );
  };
  
  export default Activity;