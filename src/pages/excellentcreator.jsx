import React from "react";
import { Router } from "@reach/router";
import Home from "../components/Home/Home";
import ExcellentCreator from "../components/ExcellentCreator/ExcellentCreator";

const ExcellentCreatorPage = () => {
  return (
    <Router basepath="/excellentcreator">
      <ExcellentCreator path="/" />
      <ExcellentCreator path="/creator" />
    </Router>
  );
};

export default ExcellentCreatorPage;
