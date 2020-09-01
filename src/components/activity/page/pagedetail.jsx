import React from "react";
import Helmet from "react-helmet";
import { Container, Avatar, Grid } from "@material-ui/core";
import { ArrowDownwardOutlined } from "@material-ui/icons";
import "../../../assets/activity/css/activity.css";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from "../comments/NavTar";
import ContestCar from "../comments/ContestCar";
import Bgimg from "../../../assets/activity/img/bg.png";
import One from "../../../assets/activity/img/detail/2.png";
import downPDF from "../../../assets/activity/img/detail/3.png";
import Two from "../../../assets/activity/img/detail/32.png";
import Three from "../../../assets/activity/img/detail/33.png";
import upFile from "../../../assets/activity/img/detail/5.png";
import Four from "../../../assets/activity/img/detail/6.png";

import Six from "../../../assets/activity/img/detail/8.png";
import Footer from "../comments/Footer";
import bgtop2 from "../../../assets/activity/img/bgtop2.png";
import title from "../../../assets/activity/img/title.png";
import lefttop from "../../../assets/activity/img/detail/lefttop.png";
import leftbottom from "../../../assets/activity/img/detail/leftbottom.png";
import rightmiddle from "../../../assets/activity/img/detail/rightmiddle.png";
class Pagedetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contest_w: 0,
    };
    this.winsize = this.winsize.bind(this);
  }
  componentDidMount() {
    this.winsize();
    window.onresize = () => {
      this.winsize();
    };
  }
  componentWillUnmount() {
    window.onresize =null;
  }
  winsize() {
    let w = document.documentElement.clientWidth;
    let size = (16 / 1920) * w;

    document.querySelector("html").style.fontSize = size + "px";
    this.setState({
      contest_w: document.getElementById("contest-judges").clientWidth,
    });
  }
  render() {
    let { contest_w } = this.state;
    console.log(contest_w);
    return (
      <Layout>
        <div>
          <Bananer />
          <NavTar />
          <div
            className="all-width"
            style={{
              backgroundImage: `url(${Bgimg})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
            <img src={One} alt="" />

            <img src={downPDF} alt="" />
            <img src={Two} alt="" />
            <img src={Three} alt="" />
            <img src={upFile} alt="" />
            <img src={Four} alt="" />
            <div className="all-width" id="contest-judges">
              <div
                className="bg-not text-center"
                style={{
                  width: "28%",
                  height: contest_w * 0.28 * 0.3,
                  backgroundImage: `url(${title})`,
                  position: "absolute",
                  left: "50%",
                  top: "-0.6rem",
                  transform: "translateX(-50%)",
                  color: "#4E07BA",
                  fontSize: "3.25rem",
                  lineHeight: contest_w * 0.28 * 0.3 + "px",
                  fontWeight: "bold",
                  zIndex: 20,
                }}
              >
                大赛评委
              </div>
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  width: "73%",
                  // height: 'auto',
                  margin: "0 auto",
                  backgroundSize: "100% auto",
                  backgroundPosition: "left top",
                  transform: "translateX(4%)",
                  backgroundImage: `url(${bgtop2})`,
            
                  position: "relative",
                  paddingTop:'3%'
                }}
              >
                <img
                  src={lefttop}
                  style={{
                    position: "absolute",
                    left: "-10%",
                    top: contest_w * 0.73 * 0.1,
                    width: "34%",
                    height: "auto",
                  }}
                  alt=""
                />
                <img
                  src={leftbottom}
                  style={{
                    position: "absolute",
                    left: "-5.7%",
                    bottom: -contest_w * 0.73 * 0.05,
                    width: "18.7%",
                    height: "auto",
                  }}
                  alt=""
                />
                <img
                  src={rightmiddle}
                  style={{
                    width: "29%",
                    height: "auto",
                    right: "-5%",
                    top: "40%",
                    position: "absolute",
                  }}
                  alt=""
                />
                <div
                  style={{
                    width: "92%",
                    backgroundColor: "#fcf800",
                    
                    transform: "translateX(1%)",
                    borderRadius: 13,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#4E07BA",
                      height: "100%",
                      transform: "translate(-5px,-2px)",
                      borderRadius: 13,
                      padding:'3.5%'
                    }}
                  >
                    <div style={{
                    borderRadius: 13,
                    padding:'10% 7.5%',
                    border: '6px solid #260D4B'}} className="bg-white">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <ContestCar />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <img src={Six} alt="" />
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
}
export default Pagedetail;
