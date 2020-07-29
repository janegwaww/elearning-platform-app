import React from "react";
import Typography from "@material-ui/core/Typography";

const styles = {
  con: {
    display: "flex",
    justifyContent: "flex-end",
  },
  text: {
    borderBottom: "2px solid #007cff",
    display: "block",
    padding: "0 0 10px 0",
  },
};

const ProtocolTitle = ({ title = "" }) => {
  return (
    <div style={styles.con}>
      <Typography style={styles.text}>{title}</Typography>
    </div>
  );
};

export default ProtocolTitle;
