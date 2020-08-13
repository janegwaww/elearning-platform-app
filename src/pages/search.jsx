import React, { Component } from "react";
import SearchLayout from "../layout/SearchLayout";
import Search from "../components/Search/Search";
import Container from "../components/Container/KeContainer";

class SearchPage extends Component {
  render() {
    return (
      <SearchLayout>
        {(input, page, type) => (
          <Container>
            <Search input={input} page={page} type={type} />
          </Container>
        )}
      </SearchLayout>
    );
  }
}

export default SearchPage;
