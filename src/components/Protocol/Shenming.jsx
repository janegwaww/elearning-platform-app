import React from "react";
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import ProtocolContainer from "./ProtocolContainer";

const Shenming = () => {
  return (
    <Layout>
      <Container>
        <ProtocolContainer
          src="/data/shenming/index.html"
          title="免责声明"
         
        />
      </Container>
    </Layout>
  );
};

export default Shenming;