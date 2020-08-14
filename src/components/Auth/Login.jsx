import React from "react";
import Helmet from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import KEForm from "../KEFormKit/KEForm";
import LoggedIn from "./LoggedIn";
import { isLoggedIn } from "../../services/auth";
import config from "../../../data/SiteConfig";
import backgroundImage from "../../../static/images/login-background-image.png";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "rgba(232,240,255,1)",
  },
  secondary: {
    background: `left top / 100% 100% no-repeat url(${backgroundImage})`,
    height: "100vh",
  },
}));

const Login = () => {
  const classes = useStyles();
  const logged = isLoggedIn();

  return (
    <div className={classes.root}>
      <div className={classes.secondary}>
        <Helmet title={`Login | ${config.siteTitle}`} />
        <CssBaseline />
        <Container maxWidth="lg">
          {!logged ? <KEForm /> : <LoggedIn />}
        </Container>
      </div>
    </div>
  );
};

export default Login;
