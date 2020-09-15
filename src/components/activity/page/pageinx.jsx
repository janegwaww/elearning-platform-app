import React from "react";

import One from "../../../assets/activity/img/inx/1.png";
import Two from "../../../assets/activity/img/inx/2.png";
import Three from "../../../assets/activity/img/inx/3.png";
import Four from "../../../assets/activity/img/inx/4.png";
import five from "../../../assets/activity/img/inx/5.png";

import upfile from "../../../assets/activity/img/inx/upfile.png";
import six from "../../../assets/activity/img/inx/6.png";
import seven from "../../../assets/activity/img/inx/7.png";


import LoginModal from "../../../assets/template/LoginModal";
import MenuBar from "../comments/MenuBar";
import { getUser, isLoggedIn } from "../../../services/auth";
import { is_phone } from "../../../assets/js/totls";
import CustomModal from "../../../assets/js/CustomModal";
import ProgressBar from "../../../assets/template/ProgressBar";
import PhoneInx from "./phoneinx";
import NavTar from "../comments/NavTar";
import Footer from '../comments/Footer';
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
    let { is_login, meun, login_status,isPhone } = this.state;
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
            <img src={five} alt="" />

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
                <img src={upfile} alt="" className="file" />
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
            <img src={six} alt=''/>
            <img src={seven} alt=''/>
            <Footer />
           
          </div>
        )}
      </div>
    );
  }
}
export default Pageinx;
