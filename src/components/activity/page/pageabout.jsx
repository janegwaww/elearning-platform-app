import React from "react";

import Footer from '../comments/Footer';

import One from '../../../assets/activity/img/about/1.png';
import Two from '../../../assets/activity/img/about/2.png';
import Three from '../../../assets/activity/img/about/3.png';
class PageAbout extends React.Component {

  render() {
    return (
      
          <div className="all-width">
            <img src={One} alt='' />
            <img src={Two} alt=''/>
            <img src={Three} alt=''/>
            <Footer />
          </div>
         
       
    );
  }
}
export default PageAbout;