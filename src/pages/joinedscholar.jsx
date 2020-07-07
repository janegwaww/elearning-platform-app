import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import JoinedScholar from "../components/JoinedScholar/JoinedScholar";

export default class JoinedScholarPage extends Component {
  render() {
    return (
      <div>
        <div className="join-scholar-container">
          <Helmet title={`Joined Scholar | ${config.siteTitle}`} />
          <div>
            <JoinedScholar />
          </div>
        </div>
      </div>
    );
  }
}
