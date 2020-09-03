import React from "react";

import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ContestCar from "../comments/ContestCar";
import Bgimg from "../../../assets/activity/img/bg.png";
import One from "../../../assets/activity/img/detail/2.png";
import downPDF from "../../../assets/activity/img/detail/3.png";
import Two from "../../../assets/activity/img/detail/32.png";
import Three from "../../../assets/activity/img/detail/331.png";
import ThreeTwo from "../../../assets/activity/img/detail/332.png";
import ThreeTh from "../../../assets/activity/img/detail/333.png";
import ThreeFo from "../../../assets/activity/img/detail/334.png";
import upFile from "../../../assets/activity/img/detail/5.png";
import Four from "../../../assets/activity/img/detail/6.png";
import Six from "../../../assets/activity/img/detail/8.png";
import Footer from "../comments/Footer";
import bgtop2 from "../../../assets/activity/img/bgtop2.png";
import title from "../../../assets/activity/img/title.png";
import lefttop from "../../../assets/activity/img/detail/lefttop.png";
import leftbottom from "../../../assets/activity/img/detail/leftbottom.png";
import rightmiddle from "../../../assets/activity/img/detail/rightmiddle.png";

import LoginModal from "../../../assets/template/LoginModal";
import MenuBar from "../comments/MenuBar";
import { getUser, isLoggedIn } from "../../../services/auth";
import activityPDF from "../../../assets/templatepdf/activity.pdf";
import figureImg from "../../../assets/activity/img/figureBg.png";
import { get_data } from "../../../assets/js/request";
import {getObj,getStyles} from '../../../assets/js/totls';

class Pagedetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contest_w: 0,
      head_w: 0,
      is_login: false,
      meun: false,
      figure_data: [],
      figure_item: null,
    };
    this.winsize = this.winsize.bind(this);
  }
  componentDidMount() {
    this.winsize();
    window.onresize = () => {
      this.winsize();
    };
    get_data(
      {
        model_name: "data",
        model_action: "get_judge",
        extra_data: {},
        model_type: "",
      },
      "video"
    ).then((res) => {
      this.setState({
        figure_data: res.result_data,
      });

      console.log(res);
    });
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  winsize() {
    this.setState({
      contest_w: document.getElementById("contest-judges").clientWidth,
    });
    let w = document.documentElement.clientWidth;

    let size = (16 / 1920) * w;
    document.querySelector("html").style.fontSize = size + "px";
  }
  render() {
    let {
      contest_w,
      is_login,
      meun,
      head_w,
      figure_data,
      figure_item,
    } = this.state;
    console.log(contest_w);
    return (
      <div>
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
          <div>
            <a href={activityPDF} download={activityPDF}>
              <img src={downPDF} alt="" />
            </a>
          </div>

          <img src={Two} alt="" />
          <img src={Three} alt="" />
          <img src={ThreeTwo} alt="" />
          <img src={ThreeTh} alt="" />
          <img src={ThreeFo} alt="" />
          <LoginModal
            open={is_login}
            onEvent={(msg) => {
              this.setState({
                is_login: false,
              });
            }}
          >
            <div
              className="all-width"
              onClick={() => {
                if (!isLoggedIn()) {
                  this.setState({
                    is_login: true,
                  });
                } else {
                  this.setState({
                    meun: true,
                  });
                }
              }}
            >
              <img src={upFile} alt="" className="file" />
              {meun && (
                <MenuBar
                  left="62%"
                  onEvent={() => {
                    this.setState({
                      meun: false,
                    });
                  }}
                />
              )}
            </div>
          </LoginModal>
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
                paddingTop: "3%",
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
                    padding: "3.5%",
                  }}
                >
                  <div
                    style={{
                      borderRadius: 13,
                      padding: "10% 7.5%",
                      border: "6px solid #260D4B",
                    }}
                    className="bg-white"
                  >
                    <Grid container spacing={3}>
                      {figure_data.map((op, inx) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={op.name}
                          onClick={() => {
                            this.setState({
                              figure_item: figure_data[inx],
                              head_w: document.querySelector(".head.figurehead").clientWidth,
                            });
                          }}
                        >
                          <ContestCar info={op} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src={Six} alt="" />
        </div>
        <Footer />
       
          <div className="figure" style={{display:figure_item?'block':'none'}}>
            <div>
              <div>
                <span
                  className="close"
                  onClick={() => {
                    this.setState({ figure_item: null });
                  }}
                >
                  <Close />
                </span>
                {/*<img src={figureImg} style={{ width: "100%", height: "auto" }} />*/}
                <div className="ma-container is-vertical" id='headBox'>
                  <div className="ma-header all-width">
                    <div
                      className="head figurehead  " id='figurehead'>
                     
                      <div className='bg-all'  style={{backgroundImage:`url(${figure_item&&figure_item.headshot})`,backgroundColor:'#e8e8e8'}}></div>
                    
                    </div>
                    <div className="box box-align-center box-center">
                      <div className="figurename box box-center box-align-center">
                        {figure_item&&figure_item.name} <div></div>
                      </div>
                      <div className="figurentitle">
                        {figure_item&&figure_item.label.map((v, inx) => (
                          <p key={inx}>· {v}</p>
                        ))}

                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ma-main view-scroll"
                    style={{ marginTop: "3rem" }}
                  >
                    {figure_item&&figure_item.introduction}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}
export default Pagedetail;
