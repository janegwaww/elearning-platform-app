import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import KEForm from "../KEFormKit/KEForm";
import { handleLogin, isLoggedIn } from "../../services/auth";
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
    height: "93.65vh"
  }
}));

const Login = () => {
  const classes = useStyles();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/users/profile`);
    }
  }, []);

  const handleSubmit = values => {
    handleLogin(values);
    navigate(`/users/profile`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.secondary}>
        <Helmet title={`Login | ${config.siteTitle}`} />
        <KEForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
