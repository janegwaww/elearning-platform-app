import React from "react";
import { Router } from "@reach/router";
import ExcellentCreator from "../components/ExcellentCreator/ExcellentCreator";
import CreatorHome from "../components/ExcellentCreator/CreatorHome";

const ExcellentCreatorPage = () => {
  return (
    <Router basepath="/excellentcreator">
      <ExcellentCreator path="/" />
      <CreatorHome path="/creator" />
    </Router>
  );
};

export default ExcellentCreatorPage;
