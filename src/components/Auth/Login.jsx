import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import urlParse from "url-parse";
import { isLoggedIn } from "../../services/auth";
import KEForm from "../KEFormKit/KEForm";
import config from "../../../data/SiteConfig";
import backgroundImage from "../../../static/images/login-background-image.png";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "rgba(232,240,255,1)"
  },
  secondary: {
    background: `left top / 100% 100% no-repeat url(${backgroundImage})`,
    height: "100vh"
  }
}));

const Login = ({ location }) => {
  const classes = useStyles();
  const origin = urlParse(location.origin, true).pathname;

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/users/profile`);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.secondary}>
        <Helmet title={`Login | ${config.siteTitle}`} />
        <KEForm originPath={origin} />
      </div>
    </div>
  );
};

export default Login;
