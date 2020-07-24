import React from "react";
import { Router } from "@reach/router";
import KeProtocol from "../components/Protocol/KeProtocol";
import PrivateProtocol from "../components/Protocol/PrivateProtocol";

const ProtocolPage = () => {
  return (
    <Router basepath="/protocol">
      <PrivateProtocol path="/privateprotocol" />
      <KeProtocol path="/" />
    </Router>
  );
};

export default ProtocolPage;
