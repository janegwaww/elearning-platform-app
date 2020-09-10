import React, { useState, useEffect } from "react";
import DialogModal from "../../components/VideoChilden/components/Dialog";
import gologin from "../img/gologin.png";
import { navigate } from "@reach/router";

const LoginModal = (props) => {
  const { children, onEvent, open } = props;
 
  const [isLogin, setIsLogin] = React.useState({
    type: 1,
    open: open,
    msg: "",
  });
  useEffect(() => {
    return () => {
      return false;
    };
  }, [open]);
  return (
    <div>
      <div>{children}</div>

      <DialogModal
        _login={isLogin}
        open={open}
        onEvent={(msg) => {
         
          if(msg.confirm){
            navigate(`/users/login`);
          }
          onEvent && onEvent(msg);
        }}
      >
        <div className="fn-size-16 fn-color-2C2C3B text-center">
          <img
            src={gologin}
            alt=""
            style={{
              position: "absolute",
              left: "50%",
              top: -135,
              zIndex: 1000,
              width: 185,
              height: 135,
              transform: "translateX(-50%)",
            }}
          />
          <div className="text-center" style={{ margin: "24px 0" }}>
            {isLogin.msg ? isLogin.msg : "亲, 此操作需登录, 是否登录?"}
          </div>
        </div>
      </DialogModal>
    </div>
  );
};
export default LoginModal;
