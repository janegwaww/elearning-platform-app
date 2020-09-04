import React from "react";
import { documentContent } from "../../services/home";

const withDocumentComponent = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        itemHeight: 841.92,
        images: [],
        loading: false,
      };
    }

    componentDidMount() {
      this.fetchData();
      window.addEventListener("resize", this.reportWindowSize);
      this.reportWindowSize();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.show !== this.props.show) {
        this.reportWindowSize();
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.reportWindowSize);
    }

    fetchData() {
      this.setState({ loading: true });
      documentContent({ file_id: this.props.id }).then((data) => {
        this.setState({ images: data.image_list, loading: false });
        this.props.getInfo(data);
      });
    }

    reportWindowSize = () => {
      setTimeout(() => {
        this.resizeImageHeight();
      }, 200);
    };

    resizeImageHeight = () => {
      const el = document.querySelector(".document-search-image");
      if (el && el.scrollHeight) {
        this.setState({ itemHeight: el.height });
      } else {
        setTimeout(() => {
          this.resizeImageHeight();
        }, 400);
      }
    };

    onItemsRendered = ({
      overscanStartIndex,
      overscanStopIndex,
      visibleStartIndex,
      visibleStopIndex,
    }) => {
      this.props.getPage(visibleStopIndex + 1);
    };

    render() {
      return (
        <WrapComponent
          onItemsRendered={this.onItemsRendered}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
};

export default withDocumentComponent;
