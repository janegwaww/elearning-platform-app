import React from "react";
import { documentSearch } from "../../services/home";

const withSearchComponent = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        array: [],
      };
    }

    onSearch = (value) => {
      const { id } = this.props;
      if (value) {
        documentSearch({ file_id: id, query_string: value, max_size: 10 }).then(
          (data) => {
            this.setState({ array: data });
          },
        );
      }
    };

    render() {
      const { array } = this.state;

      return (
        <WrapComponent
          onSearch={this.onSearch}
          itemsArray={array}
          {...this.props}
        />
      );
    }
  };
};

export default withSearchComponent;
