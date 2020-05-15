import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#2c2c3b",
    position: "relative",
    padding: "0 18px",
    transition: "max-height 1s",
    maxHeight: 0
  },
  showRoot: {
    maxHeight: "300px"
  },
  head: {
    width: "100%",
    display: "flex",
    flexWrap: "nowrap row",
    color: "#9e9ea6",
    justifyContent: "space-between",
    padding: "4px 0 0"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    "&::-webkit-scrollbar": {
      backgroundColor: "transparent",
      height: "4px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(135,135,145,0.3)",
      borderRadius: "10px"
    }
  },
  listRoot: {
    minWidth: "180px"
  },
  tile: {
    width: "88%",
    height: "92%",
    cursor: "pointer",
    border: "1px solid rgba(158,158,166,0.3)",
    borderRadius: "6px",
    backgroundColor: "rgba(0,0,0,0.4)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,1)",
      "& .MuiPaper-root": {
        backgroundColor: "rgba(0,124,255,1)"
      },
      "& #grid-tile-content": {
        color: "#fff"
      }
    }
  },
  title: {
    fontSize: "12px",
    color: theme.palette.primary.light,
    backgroundColor: "rgba(158,158,166,1)",
    padding: "0px 4px",
    marginRight: "4px"
  },
  titleBar: {
    background: "transparent",
    height: 30
  },
  content: {
    height: "100%",
    width: "100%",
    padding: "20px",
    color: "#9e9ea6",
    userSelect: "none",
    textOverflow: "ellipsis"
  }
}));

export default useStyles;
