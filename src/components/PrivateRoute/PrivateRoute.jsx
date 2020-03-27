import React, { Component } from "react";
import { navigate } from "gatsby";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!false && location.pathname !== `/users/login`) {
    navigate("/users/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
