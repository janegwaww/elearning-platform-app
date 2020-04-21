import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  secondary: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "50%",
    margin: "0 0 0 -30.57vw"
  },
  leftModule: {
    minHeight: "70.1vh",
    minWidth: "30.57vw",
    background:
      "linear-gradient(180deg,rgba(0,125,255,1) 0%, rgba(5,161,254,1) 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rightModule: {
    minHeight: "70.1vh",
    minWidth: "30.57vw",
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "strech",
    padding: "0 14.14%"
  },
  qrCode: {
    position: "absolute",
    top: 0,
    left: 0,
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
    height: "117px",
    width: "316px"
  },
  loginButton: {
    background:
      "linear-gradient(270deg,rgba(0,125,255,1) 0%,rgba(5,161,254,1) 100%)",
    borderRadius: "30px",
    width: "100%",
    color: "#fff",
    marginTop: theme.spacing(2)
  },
  welcomeTitle: {
    fontSize: "26px",
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 300,
    color: "rgba(0,0,0,1)",
    lineHeight: "42px",
    display: "block",
    textAlign: "center",
    padding: "30% 0 10px"
  },
  protocol: {
    textAlign: "center",
    padding: theme.spacing(2),
    fontSize: "12px",
    color: "#c0c4cc"
  }
}));

export default useStyles;
