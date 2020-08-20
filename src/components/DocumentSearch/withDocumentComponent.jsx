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
      /* window.addEventListener("resize", this.reportWindowSize); */
      documentContent({ file_id: this.props.id }).then((data) => {
        this.setState({ images: data.image_list });
        this.props.getInfo(data);
      });
    }

    /* componentDidUpdate(prevProps) {
     *   if (prevProps.show !== this.props.show) {
     *     this.reportWindowSize();
     *   }
     * } */

    componentWillUnmount() {
      /* window.removeEventListener("resize", this.reportWindowSize); */
    }

    reportWindowSize = (i = 0) => {
      /* const el = document.querySelector("img.document-image")[i];
       * if (el) {
       *   this.setState({ itemHeight: el.height });
       * } */
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
