import React from "react";
import Helmet from "react-helmet";
import { Container, Avatar, Grid } from "@material-ui/core";
import { ArrowDownwardOutlined } from "@material-ui/icons";
import "../../../assets/activity/css/activity.css";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from "../comments/NavTar";
import Bgimg from "../../../assets/activity/img/bg.png";
import One from "../../../assets/activity/img/detail/2.png";
import downPDF from "../../../assets/activity/img/detail/3.png";
import Two from "../../../assets/activity/img/detail/32.png";
import Three from "../../../assets/activity/img/detail/33.png";
import upFile from "../../../assets/activity/img/detail/5.png";
import Four from "../../../assets/activity/img/detail/6.png";

class Pagedetail extends React.Component {
 
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
            <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
            <img src={One} alt="" />

            <img src={downPDF} alt="" />
            <img src={Two} alt="" />
            <img src={Three} alt="" />
            <img src={upFile} alt="" />
            <img src={Four} alt="" />
          </div>
        </div>
      </Layout>
    );
  }
}
export default Pagedetail;
