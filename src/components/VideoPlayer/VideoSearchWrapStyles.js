import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  searchButton: {
    position: "absolute",
    right: "-18px",
    top: "30px",
    visibility: "visible",
    opacity: 1
  },
  hiddenSearchButton: {
    transition: "visibility 0s linear 1s,opacity 1s",
    visibility: "hidden",
    opacity: 0
  },
  searchInput: {
    position: "absolute",
    top: "30px",
    left: "50%",
    zIndex: 2,
    display: "inline-flex",
    justifyContent: "flex-start",
    transform: "translate(-50%)",
    transition: "visibility 0s linear 2s,opacity 2s",
    visibility: "hidden",
    opacity: 0
  },
  showSearchInput: {
    opacity: 1,
    visibility: "visible"
  },
  paper: {
    backgroundColor: "rgba(44,44,59,0.6)",
    borderRadius: "20px",
    width: 400,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clearIcon: {
    fontSize: 14,
    backgroundColor: "#ddd",
    borderRadius: "20px",
    marginLeft: "4px",
    color: "gray"
  }
}));

export default useStyles;
