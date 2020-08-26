import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: "auto",
  right: 0,
  zIndex: 1201,
};

const ProgressBar = ({ loading = false }) => {
  const [progress, setProgress] = useState(0);

  const increProgress = () => {
    setProgress((oldProgress) => {
      if (oldProgress === 100) {
        return oldProgress;
      }
      if (!loading) {
        return 100;
      }
      if (loading && oldProgress > 80) {
        return oldProgress;
      }
      return oldProgress + 10;
    });
  };

  useEffect(() => {
    let timer = null;
    if (loading) {
      timer = setInterval(() => {
        increProgress();
      }, 100);
    }
    if (!loading) {
      setTimeout(() => {
        timer && clearInterval(timer);
        setProgress(0);
      }, 200);
    }
  }, [loading]);

  return (
    <div style={styles}>
      {loading ? (
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
