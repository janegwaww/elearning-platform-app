import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    borderRadius: "0 0 4px 4px",
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.65rem",
    },
  },
}));

const CardTagEle = ({ name = "", color = "#007cff" }) => {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: color }} className={classes.root}>
      {name}
    </div>
  );
};

export default CardTagEle;
