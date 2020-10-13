import React from "react";

import one from "../../../assets/activity/img/phonedetail/1.png";
import two from "../../../assets/activity/img/phonedetail/2.png";
import three from "../../../assets/activity/img/phonedetail/3.png";
import four from "../../../assets/activity/img/phonedetail/4.png";
import five from "../../../assets/activity/img/phonedetail/5.png";
import six from "../../../assets/activity/img/phonedetail/6.png";
import seven from "../../../assets/activity/img/phonedetail/7.png";
import eight from "../../../assets/activity/img/phonedetail/8.png";
import nine from "../../../assets/activity/img/phonedetail/9.png";
import ten from "../../../assets/activity/img/phonedetail/10.png";
import eleven from "../../../assets/activity/img/phonedetail/11.png";
import twelve from "../../../assets/activity/img/phonedetail/12.png";
import thireteen from "../../../assets/activity/img/phonedetail/13.png";




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
          <img src={seven} alt="" />
          <img src={eight} alt="" onClick={() => {
            new CustomModal().message("此操作请在pc端打开", "error",2000);
          }} />
          <img src={nine} alt="" />
          <img src={ten} alt="" />
          <img src={eleven} alt="" />
          <img src={twelve} alt="" />
          <img src={thireteen} alt="" />
          
        </div>
        
      </div>
    );
  }
}
export default Phonedetail;
