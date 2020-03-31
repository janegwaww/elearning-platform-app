import React, { Component } from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/auth";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/users/login`) {
    navigate("/users/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
