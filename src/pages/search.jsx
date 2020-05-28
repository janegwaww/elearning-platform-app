import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import SearchLayout from "../layout/SearchLayout";
import config from "../../data/SiteConfig";
import Search from "../components/Search/Search";

class SearchPage extends Component {
  render() {
    return (
      <SearchLayout>
        {input => (
          <div
            className="search-container"
            style={{ width: "100%", padding: 20 }}
          >
            <Helmet title={`Search | ${config.siteTitle}`} />
            <Container fixed>
              <Search {...this.props} input={input} />
            </Container>
          </div>
        )}
      </SearchLayout>
    );
  }
}

export default SearchPage;
