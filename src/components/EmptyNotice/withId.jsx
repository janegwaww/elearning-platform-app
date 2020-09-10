import React, { Component, useEffect } from "react";
import { navigate } from "gatsby";
import EmptyNotice from "./EmptyNotice";
import { getIdFromHref } from "../../services/utils";
import { subscribe } from "../../services/observable";

const withId = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { id: "" };
    }

    componentDidMount() {
      this.verifyId();
      subscribe(() => this.setState({ id: "" }));
    }

    verifyId = () => {
      const { vid, did, dsid, sid, cid, dserid } = getIdFromHref();
      if (!(vid || did || dsid || sid || cid || dserid)) {
        navigate("/");
      }
      this.setState({ id: vid || did || dsid || sid || cid || dserid });
    };

    render() {
      const { id } = this.state;

      return id ? (
        <>
          <WrapComponent id={id} />
        </>
      ) : (
        <EmptyNotice type="loading" handleFresh={() => navigate("/")} />
      );
    }
  };
};

export default withId;
