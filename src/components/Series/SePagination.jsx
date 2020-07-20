import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(() => ({
  pagi: {
    backgroundColor: "#fff",
  },
  ul: {
    justifyContent: "center",
  },
}));

const Pagination = ({ num = 1, handlePage }) => {
  const classes = useStyles();
  return num === 0 ? null : (
    <MuiPagination
      count={Math.ceil(num / 12)}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
      classes={{ root: classes.pagi, ul: classes.ul }}
    />
  );
};

export default Pagination;
