import React from "react";
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import ProtocolContainer from "./ProtocolContainer";

const KeProtocol = () => {
  return (
    <Layout>
      <Container>
        <ProtocolContainer
          src="/data/rules-and-private/index.html"
          title="法律声明及隐私政策"
        />
      </Container>
    </Layout>
  );
};

export default KeProtocol;
