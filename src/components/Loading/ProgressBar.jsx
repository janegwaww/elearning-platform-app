import React, { useState, useEffect } from "react";
/* import { makeStyles } from "@material-ui/core/styles"; */
import LinearProgress from "@material-ui/core/LinearProgress";

/* const useStyles = makeStyles((theme) => ({
 *     root: {
 *         width: "100%",
 *         position: "fixed",
 *         top: 0,
 *         left: "auto",
 *         right: 0,
 *         zIndex: theme.zIndex.drawer + 1,
 *     },
 * })); */
const styles = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: "auto",
  right: 0,
  zIndex: 1201,
};

const ProgressBar = ({ loading = false }) => {
  /* const classes = useStyles(); */
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
      return oldProgress + 5;
    });
  };

  useEffect(() => {
    let timer = null;
    if (loading) {
      setShow(true);
      timer = setInterval(() => {
        increProgress();
      }, 500);
    }
    if (!loading) {
      setTimeout(() => {
        setShow(false);
        timer && clearInterval(timer);
        setProgress(0);
      }, 200);
    }
  }, [loading]);

  return (
    <div style={styles}>
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
