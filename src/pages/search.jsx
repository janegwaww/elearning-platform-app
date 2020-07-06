import React, { Component } from "react";
import Helmet from "react-helmet";
import SearchLayout from "../layout/SearchLayout";
import config from "../../data/SiteConfig";
import Search from "../components/Search/Search";
import Container from "../components/Container/KeContainer";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  componentDidMount() {
    const {
      location: { state = {} },
    } = this.props;
    this.setState({ searchValue: state && state.searchValue });
  }

  render() {
    return (
      <SearchLayout searchValue={this.state.searchValue}>
        {(input) => (
          <div className="search-container" style={{ width: "100%" }}>
            <Helmet title={`Search | ${config.siteTitle}`} />
            <Container>
              <Search {...this.props} input={input} />
            </Container>
          </div>
        )}
      </SearchLayout>
    );
  }
}

export default SearchPage;
