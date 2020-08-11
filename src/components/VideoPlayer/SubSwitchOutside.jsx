import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SubSwitch from "./SubSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(44,44,59,0.8)",
    color: "#fff",
    padding: "12px 12px",
    display: "flex",
    justifyContent: "flex-end",
    height: 57.6,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const SubSwitchOutside = ({ handleChange, disabled = false }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div>
        <SubSwitch handleChange={handleChange} disabled={disabled} />
      </div>
    </Box>
  );
};

export default SubSwitchOutside;
