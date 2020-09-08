import React from "react";

import One from "../../../assets/activity/img/phonedetail/2.png";
import downPDF from "../../../assets/activity/img/phonedetail/3.png";

import Three from "../../../assets/activity/img/phonedetail/331.png";
import ThreeTwo from "../../../assets/activity/img/phonedetail/332.png";
import ThreeTwotwo from "../../../assets/activity/img/phonedetail/3322.png";

import ThreeTh from "../../../assets/activity/img/phonedetail/333.png";
import ThreeFo from "../../../assets/activity/img/phonedetail/334.png";
import upFile from "../../../assets/activity/img/phonedetail/5.png";
import Four from "../../../assets/activity/img/phonedetail/6.png";
import seven from "../../../assets/activity/img/phonedetail/7.png";
import seventwo from "../../../assets/activity/img/phonedetail/72.png";
import seventhree from "../../../assets/activity/img/phonedetail/73.png";

import Six from "../../../assets/activity/img/phonedetail/8.png";
import Footer from "../comments/Footer";

import LoginModal from "../../../assets/template/LoginModal";

import { getUser, isLoggedIn } from "../../../services/auth";
import activityPDF from "../../../assets/templatepdf/activity.pdf";
import { is_phone } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
class Phonedetail extends React.Component {
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
  }

  render() {
    let { is_login, meun } = this.state;
    return (
      <div>
        <div className="all-width ">
          <div style={{ height: 2, backgroundColor: "#fcf800" }}></div>
          <img src={One} alt="" />
          <div>
            <a href={activityPDF} download={activityPDF}>
              <img src={downPDF} alt="" />
            </a>
          </div>

          {/*<img src={Two} alt="" />*/}
          <img src={Three} alt="" />
          <img src={ThreeTwo} alt="" />
          <img src={ThreeTwotwo} alt="" />
          <img src={ThreeTh} alt="" />
          <img src={ThreeFo} alt="" />

          <img
            src={upFile}
            alt=""
            className="file"
            onClick={() => {
              new CustomModal().message("此操作请在pc端打开", "error", 3000);
            }}
          />

          <img src={Four} alt="" />
          <img src={seven} alt="" />
          <img src={seventwo} alt="" />
          <img src={seventhree} alt="" />

          <img src={Six} alt="" />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Phonedetail;
