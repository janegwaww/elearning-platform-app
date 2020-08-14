import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
  logged: {
    position: "absolute",
    top: "50%",
  },
}));

const LoggedIn = () => {
  const classes = useStyles();
  return (
    <div className={classes.logged}>
      <Typography variant="h5" color="inherit">
        亲！您已经登录了...
      </Typography>
      <br />
      <Link href="/">返回主页</Link>
    </div>
  );
};

export default LoggedIn;
