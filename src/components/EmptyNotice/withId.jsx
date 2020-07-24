import React, { Component } from "react";
import { navigate } from "@reach/router";
import EmptypNotice from "./EmptyNotice";
import { getIdFromHref } from "../../services/utils";

const withId = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.verifyId();
    }

    handleAction = () => navigate("/");

    verifyId = () => {
      const { vid, did, dsid, sid } = getIdFromHref();
      this.setState({ id: vid || did || dsid || sid });
    };

    render() {
      const { id } = this.state;

      return id ? (
        <WrapComponent id={id} />
      ) : (
        <EmptypNotice empty type="loading" handleFresh={this.handleAction} />
      );
    }
  };
};

export default withId;
