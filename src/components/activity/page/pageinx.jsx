import React from "react";
import Helmet from "react-helmet";
import { Container, Avatar, Grid } from "@material-ui/core";
import {ArrowDownwardOutlined} from "@material-ui/icons";
import "../../../assets/activity/css/activity.css";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from '../comments/NavTar';
import Bgimg from '../../../assets/activity/img/bg.png';
import One from '../../../assets/activity/img/inx/1.png';
import upfile from '../../../assets/activity/img/inx/2.png';
import Two from '../../../assets/activity/img/inx/3.png';
class Pageinx extends React.Component {
   
  render() {
    return (
      <Layout>
        <div  style={{backgroundImage:`url(${Bgimg})`,height:'100vh',backgroundRepeat:'no-repeat'}} >
          <Bananer />
          <NavTar />
          <div className="all-height all-width ">
          <img src={One} alt=''/>
           <img src={upfile} alt=''/>
           <img src={Two} alt=''/>
        </div>
        </div>
      </Layout>
    );
  }
}
export default Pageinx;
