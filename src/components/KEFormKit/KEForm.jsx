import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import useStyles from "./KEFormStyle";
import ThirdPartyLoginOpt from "./ThirdPartyLoginOpt";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import QrCodeLoginComponent from "./QrCodeLoginComponent";
import QrCodeIcon from "./QrCodeIcon";
import prevHref from "../../services/prevHref";
import { subscribe } from "../../services/observable";
import {
  /* enquiryQRCode, */
  generateQRCode,
  handleLogin,
} from "../../services/auth";

const KEForm = ({ modal, modalClose }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [accountLogin, setAccountLogin] = useState(true);
  const [qrcodeValue, setQrcodeValue] = useState("");

  const handleNavigate = () => {
    if (modal) {
      modalClose();
    } else {
      navigate(prevHref.get() || `/`);
    }
  };

  const handleClickLogin = ({ mobile, smscode }) => {
    handleLogin({ mobile, code: smscode }).then(
      (res) => res && handleNavigate(),
    );
  };

  /* const varifyQRCode = (code) => {
   *   if (accountLogin) return;
   *   enquiryQRCode({ qrcode: code }).then((res) => {
   *     if (res) {
   *       handleNavigate();
   *     }
   *     if (!res) {
   *       setTimeout(() => {
   *         varifyQRCode(code);
   *       }, 1000);
   *     }
   *   });
   * };
   */

  useEffect(() => {
    if (!accountLogin) {
      generateQRCode().then((data) => {
        setQrcodeValue(data);
        // varifyQRCode(data);
      });
    }
  }, [accountLogin]);

  useEffect(() => {
    subscribe("authError", enqueueSnackbar);
  }, []);

  return (
    <>
      <div className={classes.secondary}>
        <Grid container>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <div className={classes.rightModule}>
              <QrCodeIcon
                accountLogin={accountLogin}
                setAccountLogin={setAccountLogin}
              />
              <div className={classes.welcomeTitle}>开动知识的引擎</div>
              {accountLogin ? (
                <div style={{ width: "100%" }}>
                  <AccountForm handleButton={handleClickLogin} />
                </div>
              ) : (
                <QrCodeLoginComponent qrcodeValue={qrcodeValue} />
              )}
              <ThirdPartyLoginOpt />
              <UserProtocol />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default KEForm;
