import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: "auto",
    right: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const ProgressBar = ({ loading = false }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

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
      const diff = Math.random() * 10;
      return Math.min(oldProgress + diff, 100);
    });
  };

  const loadInterval = () => {
    increProgress();
    if (loading) {
      setTimeout(() => {
        loadInterval();
      }, 500);
    }
  };

  useEffect(() => {
    if (loading) {
      setShow(true);
      loadInterval();
    }
    if (!loading) {
      setTimeout(() => {
        setShow(false);
        setProgress(0);
      }, 150);
    }
  }, [loading]);

  return (
    <div className={classes.root}>
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
