import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { navigate } from "gatsby";
import {
  Container,
  CssBaseline,
  Grid,
  Tooltip,
  Button,
  Typography,
  Link
} from "@material-ui/core";
import CustomInput from "./CustomInput";
import keLogo from "../../../static/images/ke-logo.png";
import qrcode from "../../../static/images/qr-code.png";
import useStyles from "./KEFormStyle";
import wechat from "../../../static/images/wechat-icon.png";
import qq from "../../../static/images/qq-icon.png";
import weibo from "../../../static/images/weibo-icon.png";
import wechatDefault from "../../../static/images/wechat-icon-default.png";
import qqDefault from "../../../static/images/qq-icon-default.png";
import weiboDefault from "../../../static/images/weibo-icon-default.png";
import account from "../../../static/images/account.png";

const KEForm = props => {
  const [accountLogin, setAccountLogin] = useState(true);
  const classes = useStyles();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      props.onSubmit(values);
      navigate(`/users/profile`);
    }, 400);
  };

  const YupObject = Yup.object({
    mobile: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("必需的"),
    smscode: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Required")
  });

  const QrCodeIcon = () => {
    const loginOptionSwitch = () => setAccountLogin(!accountLogin);
    return (
      <div className={classes.qrCode} onClick={loginOptionSwitch}>
        <div className={classes.qrImage}>
          <Tooltip title="扫描二维码登录">
            {accountLogin ? (
              <img src={qrcode} alt="qrcode" width="40" height="40" />
            ) : (
              <img src={account} alt="account" width="40" height="40" />
            )}
          </Tooltip>
        </div>
      </div>
    );
  };

  const UserProtocol = () => (
    <Typography className={classes.protocol}>
      登录代表你已同意
      <Link href="/" underline="always">
        用户协议
      </Link>
      和
      <Link href="/" underline="always">
        隐私政策
      </Link>
    </Typography>
  );

  const ThirdPartyLogin = () => {
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
      <div className={classes.thirdParty}>
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

  const AccountLoginComponent = () => (
    <div style={{ width: "100%" }}>
      <Formik
        initialValues={{ mobile: "", smscode: "" }}
        validationSchema={YupObject}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            label="手机号码"
            name="mobile"
            type="mobile"
            component={CustomInput}
          />
          <Field
            label="验证码"
            name="smscode"
            type="smscode"
            component={CustomInput}
          />
          <Button type="submit" className={classes.loginButton}>
            登录
          </Button>
        </Form>
      </Formik>
      <ThirdPartyLogin />
    </div>
  );

  const QrCodeLoginComponent = () => (
    <div style={{ textAlign: "center", marginBottom: "49px" }}>
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "#d8d8d8",
          margin: "20px auto"
        }}
      ></div>
      <Typography style={{ color: "#303133", fontSize: "14px" }}>
        扫描二维码登录
      </Typography>
      <Typography style={{ color: "#909399", fontSize: "12px" }}>
        使用知擎APP"扫一扫”用手机账号同步在电脑登录
      </Typography>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.secondary}>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.leftModule}>
                <div className={classes.KELogo}>
                  <img src={keLogo} width="316" height="117" alt="kelogo" />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.rightModule}>
                <QrCodeIcon />
                <div className={classes.welcomeTitle}>欢迎登录知擎网~</div>
                {accountLogin ? (
                  <AccountLoginComponent />
                ) : (
                  <QrCodeLoginComponent />
                )}
                <UserProtocol />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};

export default KEForm;
