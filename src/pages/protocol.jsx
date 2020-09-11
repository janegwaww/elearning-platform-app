import React from "react";
import { Router } from "@reach/router";
import KeProtocol from "../components/Protocol/KeProtocol";
import PrivateProtocol from "../components/Protocol/PrivateProtocol";
import Shenming from '../components/Protocol/Shenming';

const ProtocolPage = () => {
  return (
    <Router basepath="/protocol">
      <PrivateProtocol path="/privateprotocol" />
      <KeProtocol path="/" />
      <Shenming path='/statement' />
    </Router>
  );
};

export default ProtocolPage;
