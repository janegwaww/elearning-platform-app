import React, { Component } from "react";
import { navigate } from "@reach/router";
import EmptypNotice from "./EmptyNotice";
import { getIdFromHref } from "../../services/utils";

const withId = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { id: "" };
    }

    componentDidMount() {
      this.verifyId();
    }

    handleAction = () => navigate("/");

    verifyId = () => {
      const { vid, did, dsid, sid, cid } = getIdFromHref();
      this.setState({ id: vid || did || dsid || sid || cid });
    };

    render() {
      const { id } = this.state;

      return id ? <WrapComponent id={id} /> : null;
    }
  };
};

export default withId;
