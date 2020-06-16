import React, { Component, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { withSnackbar } from "notistack";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";
import ChannelBar from "./ChannelBar";
import { getHotVideos } from "../../services/home";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotVideos: [],
      loading: true,
      circle: false,
      page: 1
    };
  }

  isBottom(el) {
    return Math.floor(el.getBoundingClientRect().bottom) <= window.innerHeight;
  }

  trackScrolling = e => {
    const wrappedElement = document.getElementById("page-footer");
    const { hotVideos, loading, page } = this.state;
    if (this.isBottom(wrappedElement)) {
      this.setState({ circle: true });
      setTimeout(() => {
        this.setState({ circle: false });
        hotVideos.length <= 1000 && !loading && this.fetchHotVideo(page);
      }, 1500);
    }
  };

  componentDidMount() {
    this.fetchHotVideo(1);
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  fetchHotVideo = (page = 1) => {
    this.setState({ loading: true });
    getHotVideos({ max_size: 16, page }).then(data => {
      if (data.length > 0) {
        this.setState(prev => ({
          hotVideos: prev.hotVideos.concat(data),
          page: prev.page + 1
        }));
      } else {
        this.props.enqueueSnackbar("没有更多数据了", { variant: "info" });
      }
      this.setState({ loading: false });
    });
  };

  render() {
    const { hotVideos, loading, circle } = this.state;

    return (
      <Fragment>
        <ChannelBar index="000" />
        <br />
        <div style={{ minHeight: "90vh" }}>
          <GridCards
            loading={loading}
            itemCount={hotVideos.length}
            items={hotVideos}
          />
        </div>
        <br />
        <Box style={{ display: "flex", justifyContent: "center" }}>
          {circle ? <CircularProgress color="secondary" /> : null}
        </Box>
      </Fragment>
    );
  }
}

export default withSnackbar(Home);
