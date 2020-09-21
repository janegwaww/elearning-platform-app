import React from "react";

import one from "../../../assets/activity/img/phoneinx/1.png";
import two from "../../../assets/activity/img/phoneinx/2.png";
import three from "../../../assets/activity/img/phoneinx/3.png";
import four from "../../../assets/activity/img/phoneinx/4.png";
import five from "../../../assets/activity/img/phoneinx/5.png";
import six from "../../../assets/activity/img/phoneinx/6.png";
import seven from "../../../assets/activity/img/phoneinx/7.png";
import eight from "../../../assets/activity/img/phoneinx/8.png";
import nine from "../../../assets/activity/img/phoneinx/9.png";
import ten from "../../../assets/activity/img/phoneinx/10.png";
import eleven from "../../../assets/activity/img/phoneinx/11.png";
import twelve from "../../../assets/activity/img/phoneinx/12.png";


import CustomModal from "../../../assets/js/CustomModal";

export default class PhoneInx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_login: false,
      meun: false,
    };
  }
  render() {
    
    return (
      <div className="all-width">
        <img src={one} alt="" />
        <img src={two} alt="" />
        <img src={three} alt="" />
        <img src={four} alt="" />
        <img src={five} alt="" />
        <img src={six} alt="" />
        <img src={seven} alt="" />
        <img src={eight} alt="" />
        <img src={nine} alt="" />
        <img
          src={ten}
          alt=""
          onClick={() => {
            new CustomModal().message("此操作请在pc端打开", "error", 2000);
          }}
        />
        <img src={eleven} alt="" />
        <img src={twelve} alt="" />
       
       
      </div>
    );
  }
}
