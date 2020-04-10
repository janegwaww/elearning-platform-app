import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import NavBar from "../components/NavBar/NavBar";
import "./index.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <NavBar />
        <div className="layout-container">
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            
            <html lang="en" />
          </Helmet>
          {children}
        </div>
      </div>
    );
  }
}
