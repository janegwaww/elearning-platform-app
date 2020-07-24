import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  qrCode: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60px",
    height: "60px",
  },
  qrImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const QrCodeIcon = ({ accountLogin, setAccountLogin }) => {
  const classes = useStyles();
  const loginOptionSwitch = () => setAccountLogin(!accountLogin);

  return (
    <div className={classes.qrCode}>
      <div className={classes.qrImage}>
        <Tooltip title={!accountLogin ? "账号登录" : "敬请期待..."}>
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

export default QrCodeIcon;
