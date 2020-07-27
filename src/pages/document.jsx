import React, { Component } from "react";
import Layout from "../layout";
import Document from "../components/Document/Document";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";

class DocumentPage extends Component {
  render() {
    return (
      <Layout>
        <div
          className="subscription-container"
          style={{ width: "100%", backgroundColor: "#f2f2f5" }}
        >
          <LoginConfirmProvider>
            <Container>
              <Document />
            </Container>
          </LoginConfirmProvider>
        </div>
      </Layout>
    );
  }
}

export default DocumentPage;
