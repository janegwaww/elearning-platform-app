import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const styles = {
  root: {
    position: "fixed",
    bottom: "16px",
    right: "16px"
  },
  fab: {
    borderRadius: "20%"
  }
};

function ScrollTop(props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={styles.root}>
        <Fab size="small" aria-label="scroll back to top" style={styles.fab}>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollTop;
