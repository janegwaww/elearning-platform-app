import React from "react";
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import ProtocolContainer from "./ProtocolContainer";

const KeProtocol = () => {
  return (
    <Layout>
      <Container>
        <ProtocolContainer
          src="/data/user-service-protocol/index.html"
          title="知擎用户服务协议"
        />
      </Container>
    </Layout>
  );
};

export default KeProtocol;
