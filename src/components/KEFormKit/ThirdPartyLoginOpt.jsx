import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  generateThirdPartyUrl,
  handleThirdLogin,
  bindingMobile
} from "../../services/auth";
import ThirdIframe from "./ThirdIframe";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import wechat from "../../../static/images/wechat-icon.png";
import qq from "../../../static/images/qq-icon.png";
import weibo from "../../../static/images/weibo-icon.png";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: "center",
    color: "#909399",
    fontSize: "12px"
  },
  logos: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center"
  },
  logo: {
    margin: "20px 14px",
    cursor: "pointer"
  },
  bindingMobile: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: theme.zIndex.modal,
    backgroundColor: "white",
    height: "100%",
    width: "50%",
    padding: "0 6%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between"
  },
  title: {
    fontSize: "20px",
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    color: "rgba(48,49,51,1)",
    lineHeight: "28px",
    textAlign: "left",
    padding: "10% 0 10px"
  }
}));

const ThirdPartyLoginOpt = () => {
  const classes = useStyles();
  const [thirdUrl, setThirdUrl] = useState("");
  const [code, setCode] = useState("");
  const [thirdMethod, setThirdMethod] = useState("");
  const [binding, setBinding] = useState(false);
  const [acToken, setAcToken] = useState("");

  const handleLoginClick = method => {
    setThirdMethod(method);
    generateThirdPartyUrl(method).then(res => {
      if (res) {
        setThirdUrl(`${res}`);
      }
    });
  };

  const handleLogin = () => {
    const param = { code, modelType: thirdMethod };
    handleThirdLogin(param).then(response => {
      const { accessToken } = response;
      if (accessToken) {
        /* 执行绑定手机号操作 */
        setBinding(true);
        setAcToken(accessToken);
      }
      if (response && !accessToken) {
        navigate(`/users/profile`);
      }
    });
  };

  const handleBindMobile = ({ mobile }) => {
    const param = { mobile, code, accessToken: acToken };
    bindingMobile(param).then(response => {
      if (response) {
        setBinding(false);
        navigate(`/users/profile`);
      }
    });
  };

  useEffect(() => {
    if (code) {
      handleLogin();
    }
  }, [code]);

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
      <ThirdIframe url={thirdUrl} handleCode={val => setCode(val)} />
      <BindingForm />
    </div>
  );
};

export default ThirdPartyLoginOpt;
