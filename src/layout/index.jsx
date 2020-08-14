import React from "react";
import { SnackbarProvider } from "notistack";
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import config from "../../data/SiteConfig";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import SEO from "../components/SEO/SEO";
import theme from "./theme";
import "./index.sass";

const generateClassName = createGenerateClassName({
  seed: "k",
});

class MainLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider generateClassName={generateClassName}>
          <SnackbarProvider>
            <SEO>
              <CssBaseline />
              <span id="back-to-top-anchor" style={{ height: 0, width: 0 }} />
              <NavBar />
              <div className="layout-container">{children}</div>
              <ScrollTop />
              <Footer config={config} />
            </SEO>
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    );
  }
}

export default MainLayout;
