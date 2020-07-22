import { makeStyles } from "@material-ui/core/styles";
import keLoginLeftBackgroundImage from "../../../static/images/ke-pic-left.png";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  secondary: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "50%",
    margin: "0 0 0 -440px"
  },
  leftModule: {
    minHeight: "580px",
    minWidth: "440px",
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rightModule: {
    minHeight: "580px",
    minWidth: "440px",
    backgroundColor: "#fff",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "strech",
    padding: "0 10%"
  },
  qrCode: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60px",
    height: "60px"
  },
  qrImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  KELogo: {
    height: "580px",
    width: "100%",
    background: `left top / 100% 100% no-repeat url(${keLoginLeftBackgroundImage})`,
    position: "relative"
  },
  loginBg: {
    position: "absolute",
    top: "50%",
    left: "84%",
    transform: "translateY(-50%)",
    zIndex: 1
  },
  welcomeTitle: {
    fontSize: "20px",
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    color: "rgba(0,0,0,1)",
    lineHeight: "42px",
    display: "block",
    textAlign: "left",
    padding: "10% 0 10px"
  }
}));

export default useStyles;
