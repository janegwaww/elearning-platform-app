import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  protocol: {
    textAlign: "center",
    padding: theme.spacing(4),
    fontSize: "12px",
    color: "#c0c4cc"
  },
  link: {
    color: "#007cff"
  }
}));

const UserProtocol = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.protocol}>
      登录代表你已同意
      <Link href="/" underline="always" className={classes.link}>
        用户协议
      </Link>
      和
      <Link href="/" underline="always" className={classes.link}>
        隐私政策
      </Link>
    </Typography>
  );
};

export default UserProtocol;
