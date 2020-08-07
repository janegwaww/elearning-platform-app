import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SubSwitch from "./SubSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(44,44,59)",
    color: "#fff",
    padding: "0 12px",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.up("sm")]: {
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
