import React from "react";

import BananerImg from "../../../assets/activity/img/banner/banner1.png";
import BananerImg2 from "../../../assets/activity/img/banner/banner2.png";
import BananerImg3 from "../../../assets/activity/img/banner/banner3.png";

import LoginModal from "../../../assets/template/LoginModal";
import { getUser, isLoggedIn } from "../../../services/auth";
import MenuBar from './MenuBar';
const Bananer = () => {
    const [isLogin,setIsLogin]=React.useState(false);
    const [meun,setMeun]=React.useState(false);
    return(
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
          setIsLogin(false);
        }}
      >
      <div className="all-width" onClick={()=>{
          if(!isLoggedIn()){
              setIsLogin(true);
           
          }else{
              setMeun(true)
          }
      }}>
        <img
          src={BananerImg2}
          alt=""
          className="all-width file"
          style={{ height: "auto" }}
        />
        {meun&&(
            
        <MenuBar onEvent={()=>{
            setMeun(false)
        }} />
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
)};
export default Bananer;
