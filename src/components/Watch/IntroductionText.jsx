import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ChipArray from "../Introduction/ChipArray";

const IntroductionText = ({ text }) => {
  return (
    <Paper elevation={4} style={{ boxShadow: "none", padding: "20px 0" }}>
      <Typography variant="body2" component="p">
        {text.description}
      </Typography>
      <br />
      <ChipArray chips={text.category} />
    </Paper>
  );
};

export default IntroductionText;
