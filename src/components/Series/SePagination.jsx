import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagi: {
    backgroundColor: "#fff",
  },
  ul: {
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      "& .MuiPaginationItem-root": {
        height: 26,
        minWidth: 26,
        padding: "0 4px",
        margin: "0 1px",
      },
    },
  },
}));

const Pagination = ({ num = 1, handlePage }) => {
  const classes = useStyles();
  return num === 0 ? null : (
    <MuiPagination
      count={Math.ceil(num / 12)}
      variant="outlined"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
      onChange={handlePage}
      classes={{ root: classes.pagi, ul: classes.ul }}
    />
  );
};

export default Pagination;
