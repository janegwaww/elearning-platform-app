import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";

import config from "../../../../data/SiteConfig";
import NavBar from "../../NavBar/NavBar";
import { settings_html } from "../../../assets/js/totls";

import ScrollTop from "../../../layout/ScrollTop";
import theme from "../../../layout/theme";

export default class MainLayout extends React.Component {
 
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        
        <span id="back-to-top-anchor" style={{ height: 0, width: 0 }} />
        <section
          className=" bg-f9 ma-container is-vertical"
          style={{ minHeight: "100vh" }}
        >
          <header style={{ height: "4rem"}} className="ma-header">
            <NavBar />
          </header>
          <main className=" ma-main ">{children}</main>
        <ScrollTop />
        </section>
      </ThemeProvider>
    );
  }
}
