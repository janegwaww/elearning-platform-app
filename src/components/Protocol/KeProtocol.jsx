import React from "react";
/* import PDFViewer from "pdf-viewer-reactjs"; */
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import ProtocolContainer from "./ProtocolContainer";

const KeProtocol = () => {
  return (
    <Layout>
      <Container>
        <ProtocolContainer
          src="/data/rules-and-private.pdf"
          title="知擎用户服务协议"
        />
      </Container>
    </Layout>
  );
};

export default KeProtocol;
