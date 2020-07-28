import React from "react";
/* import PDFViewer from "pdf-viewer-reactjs"; */
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import ProtocolContainer from "./ProtocolContainer";
import pdf from "../../../data/user-service-protocol.pdf";

const KeProtocol = () => {
  return (
    <Layout>
      <Container>
        <ProtocolContainer src={pdf} title="法律声明及隐私政策" />
      </Container>
    </Layout>
  );
};

export default KeProtocol;
