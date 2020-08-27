import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import {
  makeStyles,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import KEForm from "../KEFormKit/KEForm";
import { isLoggedIn } from "../../services/auth";
import { getIdFromHref } from "../../services/utils";
import config from "../../../data/SiteConfig";
import backgroundImage from "../../../static/images/login-background-image.png";

const generateClassName = createGenerateClassName({
  seed: "kl",
});

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
  const { code } = getIdFromHref();

  useEffect(() => {
    if (logged && !code) {
      navigate("/users/profile/");
    }
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div className={classes.root}>
        <div className={classes.secondary}>
          <Helmet title={`Login | ${config.siteTitle}`} />
          <CssBaseline />
          <Container maxWidth="lg">
            <KEForm />
          </Container>
        </div>
      </div>
    </StylesProvider>
  );
};

export default Login;
