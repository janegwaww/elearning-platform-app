import React from "react";

import logo from "../../../../static/logos/logo.svg";
import { SearchOutlined } from "@material-ui/icons";
import style from "./style.module.css";
import { navigate } from "@reach/router";
const Head = (props) => {
  const [userinfo, setUserinfo] = React.useState(null);
  React.useEffect(() => {
    if (localStorage.getItem("haetekUser")) {
      setUserinfo(JSON.parse(localStorage.getItem("haetekUser")));
    }
  }, []);

  return (
    <header
      className="box box-align-center box-between"
      style={{ padding: "1.2em 0" }}
    >
      <img src={logo} alt="logo" style={{ width: "9em", height: "2em" }}></img>
      <div className={`box box-align-center`}>
        <SearchOutlined onClick={()=>{
          navigate(`/mobile/search`);
        }} />
        {userinfo ? (
          <div
            style={{
              width: "1.75em",
              height: "1.75em",
              borderRadius: "50%",
              marginLeft: "1.75em",
              backgroundImage: "url(" + userinfo.headshot + ")",
            }}
            className="bg-EDF6FF bg-not"
          ></div>
        ) : (
          <p className={style.fn16}>
            <span
              className="fn-color-007CFF"
              style={{ marginLeft: "1.75em" }}
              onClick={() => {
                navigate(`/users/login`);
                window.history.go();
              }}
            >
              登录&nbsp;/&nbsp;
            </span>
            注册
          </p>
        )}
        {props.is_show && (
          <div
            className={style.btn}
            onClick={() => {
              navigate(`/video`);
              window.history.go();
            }}
          >
            投稿
          </div>
        )}
      </div>
    </header>
  );
};
export default Head;
