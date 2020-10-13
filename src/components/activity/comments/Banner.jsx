import React from "react";

import BananerImg from "../../../assets/activity/img/banner/banner1.png";
import BananerImg2 from "../../../assets/activity/img/banner/banner2.png";
import BananerImg3 from "../../../assets/activity/img/banner/banner3.png";
import phoneImg1  from '../../../assets/activity/img/phoneb/1.png';
import phoneImg2  from '../../../assets/activity/img/phoneb/2.png';
import phoneImg3  from '../../../assets/activity/img/phoneb/3.png';


import { is_phone } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
import BtnFile from './BtnFile';
export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      meun: false,
      isPhone:false
    };
  }
  componentDidMount(){
    this.setState({
      isPhone:is_phone()
    })
  }

  render() {
    const { meun, isLogin,isPhone } = this.state;
    return (
      <div>
        {isPhone?(
          <div>
          <img
          src={phoneImg1}
          alt=""
          className="all-width"
          style={{ height: "auto" }}
        />
        <img
          src={phoneImg2}
          alt=""
          className="all-width"
          style={{ height: "auto" }}
          onClick={()=>{
           new CustomModal().message('此操作请在pc端打开','error');
          }}
        /><img
        src={phoneImg3}
        alt=""
        className="all-width"
        style={{ height: "auto" }}
      />
          
          </div>
        ):(

      <div>
        <img
          src={BananerImg}
          alt=""
          className="all-width"
          style={{ height: "auto" }}
        />
        <BtnFile img={BananerImg2} /> 
        <img
          src={BananerImg3}
          alt=""
          className="all-width"
          style={{ height: "auto" }}
        />
      </div>
      )}
      
      </div>
    );
  }
}
