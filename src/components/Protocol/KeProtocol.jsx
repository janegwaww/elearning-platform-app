import React from "react";
import PDFViewer from "pdf-viewer-reactjs";
import Layout from "../../layout";
import Container from "../Container/KeContainer";
import pdf from "../../../data/rules-and-private.pdf";

const KeProtocol = () => {
  return (
    <Layout>
      <Container>
        {/* <PDFViewer document={{ url: pdf }} hideNavbar pages={10} css='pdf-viwer' /> */}
        <iframe src={pdf} width='100%' height='100%' />
      </Container>
    </Layout>
  );
};

export default KeProtocol;
