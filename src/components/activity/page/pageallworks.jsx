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


class PageAllWorks extends React.Component {
  
  render() {
    return (
      <Layout>
        <div>
          <Bananer />
          <NavTar />
          <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
          <div className="all-width"> 
          
          </div>
         <Footer />
          
        </div>
      </Layout>
    );
  }
}
export default PageAllWorks;