import React from "react";
import QRCode from "qrcode.react";
import Typography from "@material-ui/core/Typography";

const QrCodeLoginComponent = ({ qrcodeValue }) => (
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

export default QrCodeLoginComponent;
