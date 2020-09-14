import React, { Component } from "react";
import useQueryMedia from "@material-ui/core/useMediaQuery";
import Layout from "../layout";
import Watch from "../components/Watch/Watch";
import WatchMobile from "../components/Watch/WatchMobile";
import Container from "../components/Container/KeContainer";
import { LoginConfirmProvider } from "../components/LoginConfirm";
import { getIdFromHref } from "../services/utils";

const WitchWatch = ({ vid = "" }) => {
  const match = useQueryMedia((theme) => theme.breakpoints.down("sm"));
  return match ? (
    <WatchMobile vid={vid} />
  ) : (
    <Container>
      <Watch vid={vid} />
    </Container>
  );
};

class WatchPage extends Component {
  render() {
    const { vid } = getIdFromHref();

    return (
      <Layout>
        <LoginConfirmProvider>
          <WitchWatch vid={vid} />
        </LoginConfirmProvider>
      </Layout>
    );
  }
}

export default WatchPage;
