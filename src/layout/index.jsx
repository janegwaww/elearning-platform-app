import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";
import config from "../../data/SiteConfig";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import theme from "./theme";
import "./index.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <div className="layout-container">
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            <html lang="en" />
          </Helmet>
          {children}
        </div>
        <Footer config={config} />
      </ThemeProvider>
    );
  }
}
