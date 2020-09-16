import React from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ErrorIcon from "@material-ui/icons/Error";
import config from "../../data/SiteConfig";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import SEO from "../components/SEO/SEO";
import theme from "./theme";
import "./index.sass";

class MainLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <SEO>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            variant="warning"
            className="layout-snackbar-provider"
            iconVariant={{ warning: <ErrorIcon color="error" /> }}
          >
            <CssBaseline />
            <span id="back-to-top-anchor" style={{ height: 0, width: 0 }} />
            <NavBar />
            <div className="layout-container">{children}</div>
            <ScrollTop />
            <Footer config={config} />
          </SnackbarProvider>
        </ThemeProvider>
      </SEO>
    );
  }
}

export default MainLayout;
