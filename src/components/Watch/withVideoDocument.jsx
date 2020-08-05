import React from "react";
import { getVideoDocument } from "../../services/video";
import { getRelativeVideos, getRecommendVideos } from "../../services/video";

const withVideoDocument = (WrapComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list: [],
        loading: false,
      };
    }

    componentDidMount() {
      const { vid, type } = this.props;
      this.setState({ loading: true });
      if (!type) {
        getVideoDocument({ video_id: vid, max_size: 10, page: 1 }).then(
          (data = []) => {
            this.setState({ list: data, loading: false });
          },
        );
      }
      if (type === "series") {
        getRelativeVideos({
          video_id: vid,
          max_size: 10,
          page: 1,
          related_type: type,
        }).then((data = []) => {
          this.setState({ list: data, loading: false });
        });
      }
      if (type === "recommend") {
        getRecommendVideos({
          video_id: vid,
          max_size: 10,
          page: 1,
          related_type: type,
        }).then((data = []) => {
          this.setState({ list: data, loading: false });
        });
      }
    }

    render() {
      return <WrapComponent {...this.state} />;
    }
  };
};

export default withVideoDocument;
