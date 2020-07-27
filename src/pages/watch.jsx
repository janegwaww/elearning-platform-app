import React, { Component } from "react";
import Layout from "../layout";
import Watch from "../components/Watch/Watch";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";
import { getIdFromHref } from "../services/utils";

class WatchPage extends Component {
  render() {
    const { vid } = getIdFromHref();

    return (
      <Layout>
        <LoginConfirmProvider>
          <Container>
            <Watch vid={vid} />
          </Container>
        </LoginConfirmProvider>
      </Layout>
    );
  }
}

export default WatchPage;
