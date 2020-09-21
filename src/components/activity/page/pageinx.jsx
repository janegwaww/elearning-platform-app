import React from "react";

import One from "../../../assets/activity/img/inx/1.png";
import Two from "../../../assets/activity/img/inx/2.png";
import Three from "../../../assets/activity/img/inx/3.png";
import Four from "../../../assets/activity/img/inx/4.png";
import five from "../../../assets/activity/img/inx/5.png";
import six from "../../../assets/activity/img/inx/6.png";
import { is_phone } from "../../../assets/js/totls";
import ProgressBar from "../../../assets/template/ProgressBar";
import PhoneInx from "./phoneinx";
import NavTar from "../comments/NavTar";
import BtnFile from '../comments/BtnFile';
class Pageinx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_login: false,
      meun: false,
      login_status: true,
      isPhone:false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        login_status: false,
      });
    }, 1500);
    this.setState({
      isPhone:is_phone()
    })
  }
  render() {
    let {  login_status,isPhone } = this.state;
    return (
      <div>
      <ProgressBar loading={login_status} speed={50} />
      <NavTar inx={1} />
        {isPhone ? (
          <PhoneInx />
        ) : (
          <div className="all-height all-width ">
            
            <img src={One} alt="" />
            <img src={Two} alt="" />
            <img src={Three} alt="" />
            <img src={Four} alt="" />
           
            <BtnFile img={five}  left="62%"/>
            <img src={six} alt=''/>
           
           
          </div>
        )}
      </div>
    );
  }
}
export default Pageinx;
