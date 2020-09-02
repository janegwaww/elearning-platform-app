import React, { Component } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";
import config from "../../data/SiteConfig";
import DocumentSearch from "../components/DocumentSearch";
import { LoginConfirmProvider } from "../components/LoginConfirm";
import theme from "../layout/theme";

class DocumentSearchPage extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="document-search-container">
          <Helmet title={`Document Search | ${config.siteTitle}`} />
          <LoginConfirmProvider>
            <DocumentSearch />
          </LoginConfirmProvider>
        </div>
      </ThemeProvider>
    );
  }
}

export default DocumentSearchPage;
