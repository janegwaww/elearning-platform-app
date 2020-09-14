import React from "react";

import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ContestCar from "../comments/ContestCar";


import one from "../../../assets/activity/img/detail/1.png";
import two from "../../../assets/activity/img/detail/2.png";
import three from "../../../assets/activity/img/detail/3.png";
import four from "../../../assets/activity/img/detail/4.png";
import five from "../../../assets/activity/img/detail/5.png";
import six from "../../../assets/activity/img/detail/6.png";
import seven from "../../../assets/activity/img/detail/7.png";
import eight from "../../../assets/activity/img/detail/8.png";

import ten from "../../../assets/activity/img/detail/10.png";

import Footer from "../comments/Footer";
import bgtop2 from "../../../assets/activity/img/bgtop2.png";
import title from "../../../assets/activity/img/title.png";
import lefttop from "../../../assets/activity/img/detail/lefttop.png";
import leftbottom from "../../../assets/activity/img/detail/leftbottom.png";


import LoginModal from "../../../assets/template/LoginModal";
import MenuBar from "../comments/MenuBar";
import { getUser, isLoggedIn } from "../../../services/auth";
import activityPDF from "../../../assets/templatepdf/activity.pdf";

import { get_data } from "../../../assets/js/request";

import { is_phone } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
import ProgressBar from "../../../assets/template/ProgressBar";
import Phonedetail from "./phonedeatil";
import NavTar from "../comments/NavTar";
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
      isPhone: false,
      login_status:true
    };
    this.winsize = this.winsize.bind(this);
  }
  componentDidMount() {
   
    this.setState({
      isPhone: is_phone(),
    });
    
   
    if(is_phone()){
       window.onresize = () => {
      this.winsize();
    };
      setTimeout(()=>{
        this.setState({
          logig_status:false
        })
      },3000)
    }else{
      this.winsize();
      this.setState({
        logig_status:false
      })
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
        logig_status:true
      });
    });
  }
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  winsize() {
  if(!this.isPhone){
    this.setState({
      contest_w: document.getElementById("contest-judges").clientWidth,
    });
  }
    
  
  }
  render() {
    let {
      contest_w,
      is_login,
      meun,
      head_w,
      figure_data,
      figure_item,
      isPhone,
      logig_status,
    } = this.state;

    return (
      <div>
      <ProgressBar loading={isPhone?logig_status:!logig_status} speed={20} />
      <NavTar inx={3} />
        {isPhone ? (
          <Phonedetail />
        ) : (
          <div>
            <div className="all-width ">
              <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
              <img src={one} alt="" />
              <div>
                <a href={activityPDF} download={activityPDF}>
                  <img src={two} alt="" />
                </a>
              </div>
              <img src={three} alt="" />
              <img src={four} alt="" />
              <img src={five} alt="" />
              <img src={six} alt="" />
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
                    if (is_phone()) {
                      new CustomModal().alert(
                        "此操作请在pc端打开",
                        "success",
                        2000
                      );
                      return;
                    }
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
                <img src={seven} alt=""  className="file"/>
                  
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
              <img src={eight} alt="" />
              <div
                className="all-width contestcar bg-not"
                id="contest-judges"
                style={{
                  
                  backgroundSize: "100% auto",
                }}
              >
                <div
                  className="bg-not text-center"
                  style={{
                    width: "10.8em",
                    height: "2.9em",
                    backgroundImage: `url(${title})`,
                    position: "absolute",
                    left: "50%",
                    top: "-0.3em",
                    transform: "translateX(-50%)",
                    color: "#4E07BA",
                    fontSize: "0.5em",
                    lineHeight: "2.9em",
                    fontWeight: "bold",
                    zIndex: 20,
                  }}
                >
                  大赛评委
                </div>
                <div
                  className="contestcar"
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
                      transform: "rotate(180deg)",
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
                      transform: "rotate(90deg)",
                    }}
                    alt=""
                  />
                  <img
                    src={leftbottom}
                    style={{
                      width: "29%",
                      height: "auto",
                      right: "-5%",
                      top: "40%",
                      position: "absolute",
                      transform: "rotate(80deg)",
                    }}
                    alt=""
                  />
                  <div
                    style={{
                      width: "92%",
                      backgroundColor: "#fcf800",

                      transform: "translateX(0.08em)",
                      borderRadius: "0.13em",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#4E07BA",
                        height: "100%",
                        transform: "translate(-0.08em,-0.05em)",
                        borderRadius: "0.13em",
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
                        <Grid container spacing={1}>
                          {figure_data.map((op, inx) => (
                            <Grid
                              item
                              xs={4}
                              key={op.name}
                              onClick={() => {
                                if (is_phone()) {
                                  return;
                                }
                                this.setState({
                                  figure_item: figure_data[inx],
                                  head_w: document.querySelector(
                                    ".head.figurehead"
                                  ).clientWidth,
                                });
                              }}
                              className="contestcar"
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

              <img src={ten} alt="" />
            </div>
            <Footer />

            <div
              className="figure "
              style={{ display: figure_item ? "block" : "none" }}
            >
              <div>
                <div className="contestcar">
                  <span
                    className="close "
                    onClick={() => {
                      this.setState({ figure_item: null });
                    }}
                  >
                    <Close />
                  </span>
                  {/*<img src={figureImg} style={{ width: "100%", height: "auto" }} />*/}
                  <div
                    className="ma-container is-vertical contestcar"
                    id="headBox"
                  >
                    <div className="ma-header all-width contestcar">
                      <div className="head figurehead " id="figurehead">
                        <div
                          className="bg-all"
                          style={{
                            backgroundImage: `url(${figure_item &&
                              figure_item.headshot})`,
                            backgroundColor: "#e8e8e8",
                          }}
                        ></div>
                      </div>
                      <div className="box box-align-center box-center contestcar">
                        <div className="figurename box box-center box-align-center">
                          {figure_item && figure_item.name}
                        </div>
                        <div className="figurentitle box-column box box-center-y">
                          {figure_item &&
                            figure_item.label.map((v, inx) => (
                              <p key={inx} title={v}>
                                · {v}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="ma-main view-scroll contestcar">
                      <p> {figure_item && figure_item.introduction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Pagedetail;
