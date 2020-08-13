import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
  jumpRoot: {
    marginLeft: 20,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  input: {
    width: 120,
  },
}));

const Pagination = ({ num = 1, handlePage, jump = false, ...others }) => {
  const classes = useStyles();
  const count = Math.ceil(num / 12);

  return num === 0 ? null : (
    <div className={classes.root}>
      <MuiPagination
        count={count}
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        onChange={handlePage}
        classes={{ root: classes.pagi, ul: classes.ul }}
        {...others}
      />
      {jump ? (
        <Paper className={classes.jumpRoot}>
          <InputBase
            id="sepagination-page-jump"
            placeholder="页数"
            width="20px"
            type="number"
            className={classes.input}
            endAdornment={
              <InputAdornment>
                <Button
                  onClick={(e) => {
                    const { value } = document.getElementById(
                      "sepagination-page-jump",
                    );
                    if (value >= 1 && value <= count) {
                      handlePage(e, Math.floor(value));
                    }
                  }}
                >
                  跳转
                </Button>
              </InputAdornment>
            }
          />
        </Paper>
      ) : null}
    </div>
  );
};

export default Pagination;
