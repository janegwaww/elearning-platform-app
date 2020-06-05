import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import config from "../../data/SiteConfig";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import theme from "./theme";
import "./index.sass";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <div className="layout-container">
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            <html lang="en" />
          </Helmet>
          {children}
        </div>
        <ScrollTop />
        <Footer config={config} />
      </ThemeProvider>
    );
  }
}
