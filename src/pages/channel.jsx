import React, { Component } from "react";
import Layout from "../layout";
import Channel from "../components/Home/Channel";
import Container from "../components/Container/KeContainer";

export default class ChannelPage extends Component {
  render() {
    return (
      <Layout>
        <div className="channel-container" style={{ width: "100%" }}>
          <Container>
            <Channel />
          </Container>
        </div>
      </Layout>
    );
  }
}
