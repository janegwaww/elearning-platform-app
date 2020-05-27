import React from "react";
import { Redirect } from "@reach/router";

const Default = () => {
  return <Redirect to="/users/login" noThrow />;
};

export default Default;
