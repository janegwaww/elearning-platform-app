import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import wechatQrcode from "../../../static/images/wechat-qrcode.jpg";
import logo from "../../../static/logos/logo.png";
import "./Footer.sass";

const QrCodeImg = () => (
  <Grid container>
    <Grid item xs={6}>
      <div style={{ textAlign: "center", margin: "14px" }}>
        <img src={wechatQrcode} alt="qrcode" width="80" />
        <Typography color="primary">扫码下载APP</Typography>
      </div>
    </Grid>
    <Grid item xs={6}>
      <div style={{ textAlign: "center", margin: "14px" }}>
        <img src={wechatQrcode} alt="qrcode" width="80" />
        <Typography color="primary">官方微信</Typography>
      </div>
    </Grid>
  </Grid>
);

const ContractUs = () => {
  const menu = [
    "版权声明",
    "侵权举报",
    "联系我们",
    "售后服务",
    "常见问题",
    "关于我们"
  ];
  return (
    <div className="contract-us">
      <ul>
        {menu.map(o => (
          <li key={o}>
            <Link>{o}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

class Footer extends Component {
  render() {
    const {
      config: { copyright }
    } = this.props;

    return (
      <footer className="footer">
        <CssBaseline />
        <div className="footer-above">
          <Container fixed>
            <Grid container>
              <Grid item xs={9}>
                <div className="footer-above-left">
                  <div className="footer-title">
                    <IconButton>
                      <img src={logo} />
                    </IconButton>
                    <Typography color="primary">
                      &#183; 开动遨游知识海洋的引擎
                    </Typography>
                  </div>
                  <ContractUs />
                </div>
              </Grid>
              <Grid item xs={3}>
                <QrCodeImg />
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className="footer-bottom">
          <Container fixed>
            <div className="notice-container">
              <h4 className="copyright">{copyright}</h4>
              <h4></h4>
            </div>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
