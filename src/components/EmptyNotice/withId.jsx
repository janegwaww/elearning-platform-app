import React, { Component } from "react";
import { navigate } from "gatsby";
import EmptyNotice from "./EmptyNotice";
import { getIdFromHref } from "../../services/utils";
import { subscribe } from "../../services/observable";

const withId = (WrapComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { id: "", idNotExist: false };
      this.verifyId = this.verifyId.bind(this);
    }

    componentDidMount() {
      this.verifyId();
      subscribe(() => this.setState({ idNotExist: true }));
    }

    verifyId() {
      const { vid, did, dsid, sid, cid, dserid } = getIdFromHref();
      this.setState({ id: vid || did || dsid || sid || cid || dserid });
    }

    render() {
      const { id, idNotExist } = this.state;

      if (idNotExist) {
        return <EmptyNotice type="loading" handleFresh={() => navigate("/")} />;
      }

      return id ? <WrapComponent id={id} /> : null;
    }
  };
};

export default withId;
