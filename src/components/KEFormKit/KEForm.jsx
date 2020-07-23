import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import QRCode from "qrcode.react";
import { Container, Grid, Tooltip, Typography } from "@material-ui/core";
import ThirdPartyLoginOpt from "./ThirdPartyLoginOpt";
import useStyles from "./KEFormStyle";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import {
  generateQRCode,
  enquiryQRCode,
  handleLogin,
} from "../../services/auth";

const KEForm = ({ modal, modalClose }) => {
  const classes = useStyles();
  const [accountLogin, setAccountLogin] = useState(true);
  const [qrcodeValue, setQrcodeValue] = useState("");

  const handleNavigate = () => {
    if (modal) {
      modalClose();
    } else {
      navigate(`/`);
    }
  };

  const handleClickLogin = ({ mobile, smscode }) => {
    handleLogin({ mobile, code: smscode }).then((res) => {
      if (res) {
        handleNavigate();
      }
    });
  };

  const varifyQRCode = (code) => {
    if (accountLogin) return;
    enquiryQRCode({ qrcode: code }).then((res) => {
      if (res) {
        handleNavigate();
      }
      if (!res) {
        setTimeout(() => {
          varifyQRCode(code);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    if (!accountLogin) {
      generateQRCode().then((data) => {
        setQrcodeValue(data);
        // varifyQRCode(data);
      });
    } else {
    }
  }, [accountLogin]);

  useEffect(() => {
    return () => {};
  }, []);

  const QrCodeIcon = () => {
    const loginOptionSwitch = () => setAccountLogin(!accountLogin);
    return (
      <div className={classes.qrCode} onClick={loginOptionSwitch}>
        <div className={classes.qrImage}>
          <Tooltip title={!accountLogin ? "账号登录" : "扫描二维码登录"}>
            {accountLogin ? (
              <img
                src="/images/qr-code.png"
                alt="qrcode"
                width="40"
                height="40"
              />
            ) : (
              <img
                src="/images/account.png"
                alt="account"
                width="40"
                height="40"
              />
            )}
          </Tooltip>
        </div>
      </div>
    );
  };

  const AccountLoginComponent = () => (
    <div style={{ width: "100%" }}>
      <AccountForm handleButton={handleClickLogin} />
    </div>
  );

  const QrCodeLoginComponent = () => (
    <div style={{ textAlign: "center" }}>
      <div>
        <div
          style={{
            width: "140px",
            height: "140px",
            backgroundColor: "transparent",
            margin: "30px auto",
          }}
        >
          <QRCode value={qrcodeValue} level="L" size={140} />
        </div>
        <Typography
          style={{ color: "#303133", fontSize: "14px", marginBottom: "10px" }}
        >
          扫描二维码登录
        </Typography>
        <Typography style={{ color: "#909399", fontSize: "12px" }}>
          使用知擎APP&quot;扫一扫&quot;用手机账号同步在电脑登录
        </Typography>
      </div>
    </div>
  );

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.secondary}>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.leftModule}>
                <div className={classes.KELogo}>
                  <img
                    src="/images/login-bg.png"
                    alt="login-bg"
                    height="397"
                    width="144"
                    className={classes.loginBg}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.rightModule}>
                <QrCodeIcon />
                <div className={classes.welcomeTitle}>开动知识的引擎</div>
                {accountLogin ? (
                  <AccountLoginComponent />
                ) : (
                  <QrCodeLoginComponent />
                )}
                <Typography
                  align="center"
                  style={{ fontSize: 12, color: "#909399" }}
                >
                  未注册的手机号码验证后自动创建知擎账号
                </Typography>
                <ThirdPartyLoginOpt handleNavigate={handleNavigate} />
                <UserProtocol />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default KEForm;
