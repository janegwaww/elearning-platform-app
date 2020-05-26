import React from "react";
import { Router } from "@reach/router";
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
