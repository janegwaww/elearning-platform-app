import React from "react";
import Helmet from "react-helmet";
import { Container, Avatar, Grid } from "@material-ui/core";
import { ArrowDownwardOutlined } from "@material-ui/icons";
import "../../../assets/activity/css/activity.css";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from "../comments/NavTar";
import Footer from '../comments/Footer';
import Bgimg from "../../../assets/activity/img/bg.png";
import One from '../../../assets/activity/img/about/1.png';
import Two from '../../../assets/activity/img/about/2.png';
import Three from '../../../assets/activity/img/about/3.png';
class PageAbout extends React.Component {

  render() {
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url(${Bgimg})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Bananer />
          <NavTar />
          <div className="all-width">
            <img src={One} alt='' />
            <img src={Two} alt=''/>
            <img src={Three} alt=''/>
            <Footer />
          </div>
         
        </div>
      </Layout>
    );
  }
}
export default PageAbout;