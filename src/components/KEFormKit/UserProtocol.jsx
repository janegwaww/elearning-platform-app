import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../Link/Link";

const useStyles = makeStyles((theme) => ({
  protocol: {
    textAlign: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    fontSize: "12px",
    color: "#c0c4cc",
  },
  link: {
    color: "#007cff",
  },
}));

const UserProtocol = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.protocol}>
      登录代表你已同意
      <Link href="/protocol/" underline="always" className={classes.link}>
        知擎协议
      </Link>
      和
      <Link
        href="/protocol/privateprotocol"
        underline="always"
        className={classes.link}
      >
        隐私保护指引
      </Link>
    </Typography>
  );
};

export default UserProtocol;
