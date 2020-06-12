import React from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const ChipArray = ({ chips = [] }) => {
  return (
    <Paper
      component="ul"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 4,
        margin: 0,
        boxShadow: "none"
      }}
    >
      {chips.map(o => (
        <li key={o}>
          <Chip
            label={o}
            size="small"
            style={{
              margin: 4,
              backgroundColor: "rgba(242,242,245,1)",
              color: "rgba(135,135,145,1)"
            }}
          />
        </li>
      ))}
    </Paper>
  );
};

export default ChipArray;
