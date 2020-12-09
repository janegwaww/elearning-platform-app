import React from "react";
import { delay, defer } from "lodash";
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

      this.resizeImageHeight = this.resizeImageHeight.bind(this);
      this.reportWindowSize = this.reportWindowSize.bind(this);
      this.onItemsRendered = this.onItemsRendered.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
      this.fetchData();
      window.addEventListener("resize", this.reportWindowSize);
      this.reportWindowSize();
    }

    componentDidUpdate(prevProps) {
      const { show } = this.props;
      if (prevProps.show !== show) {
        this.reportWindowSize();
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.reportWindowSize);
    }

    fetchData() {
      const { id, getInfo } = this.props;
      this.setState({ loading: true });
      documentContent({ file_id: id }).then((data) => {
        this.setState({ images: data.image_list, loading: false });
        getInfo(data);
      });
    }

    reportWindowSize() {
      delay(this.resizeImageHeight, 100);
    }

    resizeImageHeight() {
      const el = document.querySelector(".document-search-image");
      if (el && el.scrollHeight) {
        this.setState({ itemHeight: el.height });
      } else {
        defer(this.resizeImageHeight);
      }
    }

    onItemsRendered({
      overscanStartIndex,
      overscanStopIndex,
      visibleStartIndex,
      visibleStopIndex,
    }) {
      const { getPage } = this.props;
      getPage(visibleStopIndex + 1);
    }

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
