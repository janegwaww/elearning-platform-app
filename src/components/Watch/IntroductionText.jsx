import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ChipArray from "../Introduction/ChipArray";
import Moment from "../Moment";

const styles = {
  paper: {
    boxShadow: "none",
    padding: "20px 0",
  },
  desc: {
    whiteSpace: "pre-wrap",
  },
};

const IntroductionText = ({ text = {} }) => {
  return (
    <Paper elevation={4} style={styles.paper}>
      <Moment date={text.upload_time} format="YYYY年MM月D日" />
      <Typography variant="body2" component="pre" style={styles.desc}>
        {text.description}
      </Typography>
      <br />
      <ChipArray chips={text.category} />
    </Paper>
  );
};

export default IntroductionText;
