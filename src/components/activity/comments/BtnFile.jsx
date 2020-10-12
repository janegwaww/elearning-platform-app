import React from "react";
import LoginModal from "../../../assets/template/LoginModal";
import { getUser, isLoggedIn } from "../../../services/auth";
import MenuBar from "./MenuBar";

const BtnFile=props=>{
    const [isLogin,setIsLogin]=React.useState(false);
    const [meun,setMeun] =React.useState(false);

    return (
        <LoginModal  open={isLogin}
        onEvent={(msg) => {
         setIsLogin(false);
        }}>
        <div
            className="all-width"
            onClick={() => {
              if (!isLoggedIn()) {
                  setIsLogin(true)
               
              } else {
                  setMeun(true)
                
              }
            }}
          >
            <img
              src={props.img}
              alt=""
              className="all-width file"
              style={{ height: "auto" }}
            />
            {meun && (
              <MenuBar
              left={props.left||''}
                onEvent={() => {
                    setMeun(false)
                }}
              />
            )}
          </div>
        </LoginModal>
    )
}
export default BtnFile;