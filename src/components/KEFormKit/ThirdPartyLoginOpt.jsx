import React, { useState } from "react";
import wechat from "../../../static/images/wechat-icon.png";
import qq from "../../../static/images/qq-icon.png";
import weibo from "../../../static/images/weibo-icon.png";
import wechatDefault from "../../../static/images/wechat-icon-default.png";
import qqDefault from "../../../static/images/qq-icon-default.png";
import weiboDefault from "../../../static/images/weibo-icon-default.png";

const ThirdPartyLoginOpt = () => {
  const Logo = ({ urls }) => {
    const [chosen, setChosen] = useState(false);
    return (
      <div
        style={{ margin: "10px 8px", cursor: "pointer" }}
        onMouseOver={() => setChosen(true)}
        onMouseOut={() => setChosen(false)}
      >
        <img
          src={urls[0]}
          alt="thirdpartylogin"
          width="32"
          style={{ display: chosen ? "none" : "block" }}
        />
        <img
          src={urls[1]}
          alt="thirdpartylogin"
          width="32"
          style={{ display: !chosen ? "none" : "block" }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        margin: "30px 0",
        textAlign: "center",
        color: "#909399",
        fontSize: "12px"
      }}
    >
      <div>第三方账号登录</div>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "center"
        }}
      >
        <Logo urls={[wechatDefault, wechat]} />
        <Logo urls={[qqDefault, qq]} />
        <Logo urls={[weiboDefault, weibo]} />
      </div>
    </div>
  );
};

export default ThirdPartyLoginOpt;
