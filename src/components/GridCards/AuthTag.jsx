import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  officetag: {
    marginLeft: "10px",
    lineHeight: "normal",
    "& > .chip": {
      height: "20px",
      borderRadius: "4px",
      fontSize: "0.75rem",
      "& > span": {
        paddingLeft: "6px",
        paddingRight: "6px",
        "@media screen and (max-width: 960px)": {
          height: "18px",
          fontSize: "0.7rem",
          "& > span": {
            paddingLeft: "4px",
            paddingRight: "4px",
          },
        },
      },
    },
  },
});

const AuthTag = ({ authority }) => {
  const classes = useStyles();

  return (
    authority === 20 && (
      <div className={classes.officetag}>
        <Chip
          variant="outlined"
          size="small"
          label="官方"
          color="secondary"
          className="chip"
        />
      </div>
    )
  );
};

export default AuthTag;
