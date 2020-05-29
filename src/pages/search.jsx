import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container";
import SearchLayout from "../layout/SearchLayout";
import config from "../../data/SiteConfig";
import Search from "../components/Search/Search";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  componentDidMount() {
    const {
      location: { state = {} }
    } = this.props;
    this.setState({ searchValue: state && state.searchValue });
  }

  render() {
    return (
      <SearchLayout searchValue={this.state.searchValue}>
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
