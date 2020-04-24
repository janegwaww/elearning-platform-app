import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { handleLogin } from "../../services/auth";
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
  }
}));

const ThirdPartyLoginOpt = () => {
  const classes = useStyles();

  const handleLoginClick = () => {
    if (false) {
      handleLogin();
    }
  };

  const Logo = ({ url }) => (
    <div className={classes.logo} onClick={handleLoginClick}>
      <img src={url} alt="thirdpartylogin" width="32" />
    </div>
  );

  return (
    <div className={classes.root}>
      <div>第三方账号登录</div>
      <div className={classes.logos}>
        <Logo url={wechat} />
        <Logo url={qq} />
        <Logo url={weibo} />
      </div>
    </div>
  );
};

export default ThirdPartyLoginOpt;
