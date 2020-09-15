import React from "react";

import BananerImg from "../../../assets/activity/img/banner/banner1.png";
import BananerImg2 from "../../../assets/activity/img/banner/banner2.png";
import BananerImg3 from "../../../assets/activity/img/banner/banner3.png";
import phoneImg1  from '../../../assets/activity/img/phoneb/1.png';
import phoneImg2  from '../../../assets/activity/img/phoneb/2.png';
import phoneImg3  from '../../../assets/activity/img/phoneb/3.png';

import LoginModal from "../../../assets/template/LoginModal";
import { getUser, isLoggedIn } from "../../../services/auth";
import MenuBar from "./MenuBar";
import { is_phone } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";

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
           new CustomModal().message('此操作请在pc端打开','error',3000);
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

        <LoginModal
          open={isLogin}
          onEvent={(msg) => {
            this.setState({
              isLogin: false,
            });
          }}
        >
          <div
            className="all-width"
            onClick={() => {
              

              if (!isLoggedIn()) {
                this.setState({
                  isLogin: true,
                });
              } else {
                this.setState({
                  meun: true,
                });
              }
            }}
          >
            <img
              src={BananerImg2}
              alt=""
              className="all-width file"
              style={{ height: "auto" }}
            />
            {meun && (
              <MenuBar
                onEvent={() => {
                  this.setState({
                    meun:false
                  })
                 
                }}
              />
            )}
          </div>
        </LoginModal>

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
