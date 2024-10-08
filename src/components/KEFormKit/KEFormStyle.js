import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  secondary: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "50%",
    margin: "0 0 0 -440px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 0 -220px",
    },
    [theme.breakpoints.down("xs")]: {
      left: 0,
      margin: 0,
      width: "100%",
    },
  },
  leftModule: {
    minHeight: "580px",
    minWidth: "440px",
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rightModule: {
    minHeight: "580px",
    minWidth: "440px",
    backgroundColor: "#fff",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "strech",
    padding: "0 10%",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      minHeight: "100%",
    },
  },
  KELogo: {
    height: "580px",
    width: "100%",
    background: `left top / 100% 100% no-repeat url('/images/ke-pic-left.png')`,
    position: "relative",
  },
  loginBg: {
    position: "absolute",
    top: "50%",
    left: "84%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: "20px",
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    color: "rgba(0,0,0,1)",
    lineHeight: "42px",
    display: "block",
    textAlign: "left",
    padding: "10% 0 10px",
  },
}));

export default useStyles;
