import React, { Component } from "react";
import { navigate } from "gatsby";
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

    verifyId = () => {
      const { vid, did, dsid, sid, cid, dserid } = getIdFromHref();
      if (!(vid || did || dsid || sid || cid || dserid)) {
        navigate("/");
      }
      this.setState({ id: vid || did || dsid || sid || cid || dserid });
    };

    render() {
      const { id } = this.state;

      return id ? <WrapComponent id={id} /> : null;
    }
  };
};

export default withId;
