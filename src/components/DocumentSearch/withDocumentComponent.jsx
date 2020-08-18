import React from "react";
import { documentContent } from "../../services/home";

const withDocumentComponent = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        height: 841.92,
        width: 595.2,
        images: [],
      };
    }

    componentDidMount() {
      /* window.addEventListener("resize", this.reportWindowSize); */
      documentContent({ file_id: this.props.id }).then((data) => {
        this.setState({ images: data.image_list });
        this.props.getUrl(data.file_path);
      });
    }

    componentWillUnmount() {
      /* window.removeEventListener("resize", this.reportWindowSize); */
    }

    reportWindowSize = () => {
      /* const el = document.querySelector("document-image")[0];
       * const height = el.scrollHeight;
       * const width = el.width;
       * this.setState({ height, width }); */
    };

    render() {
      return <WrapComponent {...this.state} {...this.props} />;
    }
  };
};

export default withDocumentComponent;
