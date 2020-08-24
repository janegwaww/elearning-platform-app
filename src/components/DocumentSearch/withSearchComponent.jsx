import React from "react";
import { documentSearch } from "../../services/home";

const withSearchComponent = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        array: [],
        loading: false,
      };
    }

    onSearch = (value) => {
      const { id } = this.props;
      if (value) {
        this.setState({ loading: true });
        documentSearch({ file_id: id, query_string: value, max_size: 10 }).then(
          (data = []) => {
            this.setState({ array: data, loading: false });
          },
        );
      }
    };

    handleClick = (item) => {
      const { array } = this.state;
      this.props.onClick(item);
      this.setState({
        array: array.map((o, i) => {
          if (i === item.index) {
            return { ...o, isActive: true };
          } else {
            return { ...o, isActive: false };
          }
        }),
      });
    };

    render() {
      const { array, loading } = this.state;

      return (
        <WrapComponent
          onSearch={this.onSearch}
          itemsArray={array}
          itemClick={this.handleClick}
          loading={loading}
          {...this.props}
        />
      );
    }
  };
};

export default withSearchComponent;
