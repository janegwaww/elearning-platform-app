import React from "react";
import { Router } from "@reach/router";
import Profile from "../components/Profile/Profile";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Default from "../components/Default/Default";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Users = () => {
  return (
    <Router basepath="/users">
      <PrivateRoute path="/profile" component={Profile} />
      <Login path="/login" />
      <Signup path="signup" />
      <Default path="/" />
    </Router>
  );
};

export default Users;
