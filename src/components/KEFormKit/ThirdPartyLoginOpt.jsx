import React, { useState, useEffect } from "react";
import { globalHistory } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import urlParse from "url-parse";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import useStyles from "./ThirdPartyLoginOptStyle";
import {
  generateThirdPartyUrl,
  handleThirdLogin,
  bindingMobile,
} from "../../services/auth";
import wechat from "../../../static/images/wechat-icon.png";
import qq from "../../../static/images/qq-icon.png";
import weibo from "../../../static/images/weibo-icon.png";

const ThirdPartyLoginOpt = ({ handleNavigate }) => {
  const classes = useStyles();
  const locationHref = globalHistory.location.href;
  const [thirdMethod, setThirdMethod] = useState("qq");
  const [binding, setBinding] = useState(false);
  const [acToken, setAcToken] = useState("");

  // 第一步：获取跳转链接
  const handleLoginClick = (method) => {
    setThirdMethod(method);
    generateThirdPartyUrl({ type: method }).then((res) => {
      if (res) {
        window.location.href = `${res}`;
      }
    });
  };

  const track = (msg) => (data) => console.log(`${msg}: `, data);
  // 第二步：拿到code进行登录操作
  const handleLogin = ({ code }) => {
    const param = { code, type: thirdMethod };
    handleThirdLogin(param).then((response) => {
      const { accessToken } = response;
      if (accessToken) {
        /* 执行绑定手机号操作 */
        setBinding(true);
        setAcToken(accessToken);
        track("bind")(accessToken);
        return;
      }
      if (response && !accessToken) {
        handleNavigate();
        track("login")(response);
        return;
      }
      track("else")(response);
    });
  };

  // 第三步：绑定手机号
  const handleBindMobile = ({ mobile, smscode }) => {
    const param = { mobile, code: smscode, access_token: acToken };
    bindingMobile(param).then((response) => {
      if (response) {
        setBinding(false);
        handleNavigate();
      }
    });
  };

  const getThirdCode = (href) => urlParse(href, true).query.code || "";

  useEffect(() => {
    const getCode = getThirdCode(locationHref);
    if (getCode) {
      handleLogin({ code: getCode });
    }
  }, [locationHref]);

  const Logo = ({ url, method }) => (
    <div className={classes.logo} onClick={() => handleLoginClick(method)}>
      <img src={url} alt="thirdpartylogin" width="32" />
    </div>
  );

  const BindingForm = () =>
    binding ? (
      <div className={classes.bindingMobile}>
        <div>
          <Typography variant="h5" gutterBottom className={classes.title}>
            第一次登录需要绑定手机号码
          </Typography>
          <AccountForm
            handleButton={handleBindMobile}
            buttonText="绑定并登录"
          />
        </div>
        <UserProtocol />
      </div>
    ) : null;

  return (
    <div className={classes.root}>
      <div>第三方账号登录</div>
      <div className={classes.logos}>
        <Logo url={wechat} method="wechat" />
        <Logo url={qq} method="qq" />
        <Logo url={weibo} method="weibo" />
      </div>
      <BindingForm />
    </div>
  );
};

export default ThirdPartyLoginOpt;
