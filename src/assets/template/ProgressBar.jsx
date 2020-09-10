import React, { useState, useEffect } from "react";
 import { makeStyles} from "@material-ui/core/styles"; 
import LinearProgress from "@material-ui/core/LinearProgress";

 const useStyles = makeStyles((theme) => ({
   root: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: "auto",
    right: 0,
    zIndex: 200000,
    height:5,
    '& .MuiLinearProgress-colorSecondary':{
      backgroundColor:'rgb(158,205,255)',
      '& .MuiLinearProgress-barColorSecondary':{
        backgroundColor:'#007cff',
      }
    }
     },
  })); 


const ProgressBar = ({ loading = false,speed=5 }) => {
const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const timerRef = React.useRef();
  const increProgress = () => {
    setProgress((oldProgress) => {
      if (oldProgress === 100) {
        return oldProgress;
      }
      if (!loading) {
        return 100;
      }
      if (loading && oldProgress > 90) {
        return oldProgress;
      }
      return oldProgress + speed;
    });
  };

  useEffect(() => {
    if (loading) {
      setShow(true);
      timerRef.current = setInterval(() => {
        increProgress();
      }, 500);
    }
    if (!loading) {
        setShow(false);
        setProgress(0);
    }
    return()=>{
      timerRef.current&&clearInterval(timerRef.current)
    }
  }, [loading]);

  return (
   
    <div  className={classes.root}>
      {show ? (
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      ) : null}
    </div>
    
  );
};

export default ProgressBar;
