import React from "react";

import One from "../../../assets/activity/img/phoneabout/1.png";
import Two from "../../../assets/activity/img/phoneabout/2.png";
import Three from "../../../assets/activity/img/phoneabout/3.png";
// import four from "../../../assets/activity/img/phoneabout/4.png";
// import five from "../../../assets/activity/img/phoneabout/5.png";
// import six from '../../../assets/activity/img/phfot.png'

class PhoneAbout extends React.Component {
  render() {
    return (
      <div className="all-width">
        <img src={One} alt="" />
        <img src={Two} alt="" />
        <img src={Three} alt="" />
       {/* <img src={four} alt="" />
        <img src={five} alt="" />
        <img src={six} alt=''/>*/ }
      </div>
    );
  }
}
export default PhoneAbout;
