import React from "react";
import { documentContent } from "../../services/home";

const withDocumentComponent = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        itemHeight: 841.92,
        images: [],
      };
    }

    componentDidMount() {
      documentContent({ file_id: this.props.id }).then((data) => {
        this.setState({ images: data.image_list });
        this.props.getInfo(data);
      });
      window.addEventListener("resize", this.reportWindowSize);
      this.reportWindowSize();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.show !== this.props.show) {
        setTimeout(() => {
          this.reportWindowSize();
        }, 200);
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.reportWindowSize);
    }

    reportWindowSize = () => {
      const el = document.querySelector(".document-search-image");
      if (el && el.scrollHeight) {
        this.setState({ itemHeight: el.scrollHeight });
      } else {
        setTimeout(() => {
          this.reportWindowSize();
        }, 500);
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
