import React from "react";
import { Router } from "@reach/router";
import Layout from "../layout";
import Profile from "../components/Profile/Profile";
import Login from "../components/Login/Login";
import Default from "../components/Default/Default";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Users = () => {
  return (
    <Layout>
      <Router basepath="/users">
        <PrivateRoute path="/profile" component={Profile} />
        <Login path="/login" />
        <Default path="/" />
      </Router>
    </Layout>
  );
};

export default Users;
