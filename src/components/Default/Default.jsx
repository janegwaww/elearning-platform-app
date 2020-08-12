import React from "react";
import { Redirect } from "@reach/router";
import { isLoggedIn } from "../../services/auth";
const Default = () => {
  if(isLoggedIn()){
    return <Redirect to="/users/profile" noThrow />;
  }
  return <Redirect to="/users/login" noThrow />;
};

export default Default;
