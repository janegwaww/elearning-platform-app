import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagination: {
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Pagination({ total = 0, handlePage = () => ({}) }) {
  const classes = useStyles();

  return (
    <MuiPagination
      count={Math.ceil(total / 16)}
      variant="outlined"
      shape="rounded"
      classes={{ ul: classes.pagination }}
      onChange={handlePage}
    />
  );
}
