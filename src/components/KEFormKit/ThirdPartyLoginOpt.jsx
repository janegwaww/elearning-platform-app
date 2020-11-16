import React from "react";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import withThirdLogin from "./withThirdLogin";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import useStyles from "./ThirdPartyLoginOptStyle";

const thirdInfo = [
  { url: "/images/wechat-icon.png", method: "wechat" },
  { url: "/images/qq-icon.png", method: "qq" },
  { url: "/images/weibo-icon.png", method: "microblog" },
];

const BindingForm = ({ binding, onBinding }) => {
  const classes = useStyles();
  return binding ? (
    <div className={classes.bindingMobile}>
      <div>
        <Typography variant="h5" gutterBottom className={classes.title}>
          第一次登录需要绑定手机号码
        </Typography>
        <AccountForm handleButton={onBinding} buttonText="绑定并登录" />
      </div>
      <UserProtocol />
    </div>
  ) : null;
};

const Logo = ({ url, method, onClick }) => {
  const classes = useStyles();
  return (
    <ButtonBase
      type="text"
      className={classes.logo}
      onClick={() => onClick(method)}
    >
      <img src={url} alt="thirdpartylogin" width="32" />
    </ButtonBase>
  );
};

const ThirdPartyLoginOpt = ({
  handleLoginClick,
  handleBindMobile,
  binding,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>社交帐号登录</div>
      <div className={classes.logos}>
        {thirdInfo.map((i) => (
          <Logo
            url={i.url}
            method={i.method}
            onClick={handleLoginClick}
            key={i.url}
          />
        ))}
      </div>
      <BindingForm binding={binding} onBinding={handleBindMobile} />
    </div>
  );
};

export default withThirdLogin(ThirdPartyLoginOpt);
