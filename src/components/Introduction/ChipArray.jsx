import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  chips: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    boxShadow: "none"
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "rgba(242,242,245,1)",
    color: "rgba(135,135,145,1)"
  }
}));

const ChipArray = ({ chips = [] }) => {
  const classes = useStyles();

  return (
    <Paper component="ul" className={classes.chips}>
      {chips.map(o => (
        <li key={o}>
          <Chip label={o} size="small" className={classes.chip} />
        </li>
      ))}
    </Paper>
  );
};

export default ChipArray;
