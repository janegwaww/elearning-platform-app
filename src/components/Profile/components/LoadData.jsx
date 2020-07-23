import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles  } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "#ddd",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign:'text-center',
    '& .MuiCircularProgress-colorPrimary':{
        color: "#ddd",
    },
  },
  text:{
    transform: "translateX(-20px)",
   } 
}));

const LoadData = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <p className={classes.text}>数据加载中...</p>
    </div>
  );
};
export default LoadData;
