import React, { Component } from "react";
import { navigate } from "@reach/router";
import EmptypNotice from "./EmptyNotice";
import { getIdFromHref } from "../../services/utils";

const withId = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    handleAction = () => navigate("/");

    verifyId = () => {
      const { vid, did, dsid, sid } = getIdFromHref();
      const id = vid || did || dsid || sid;
      return id;
    };

    render() {
      const id = this.verifyId();

      return id ? (
        <WrapComponent id={id} />
      ) : (
        <EmptypNotice empty type="loading" handleFresh={this.handleAction} />
      );
    }
  };
};

export default withId;
