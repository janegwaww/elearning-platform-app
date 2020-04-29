import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: "center",
    color: "#909399",
    fontSize: "12px"
  },
  logos: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center"
  },
  logo: {
    margin: "20px 14px",
    cursor: "pointer"
  },
  bindingMobile: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: theme.zIndex.modal,
    backgroundColor: "white",
    height: "100%",
    width: "50%",
    padding: "0 6%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between"
  },
  title: {
    fontSize: "20px",
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    color: "rgba(48,49,51,1)",
    lineHeight: "28px",
    textAlign: "left",
    padding: "10% 0 10px"
  }
}));

export default useStyles;
