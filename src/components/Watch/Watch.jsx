import React, { Component, Fragment, lazy, Suspense } from "react";
import { globalHistory } from "@reach/router";
import { navigate } from "gatsby";
import { Grid, Divider } from "@material-ui/core";
import urlParse from "url-parse";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const LazyComments = lazy(() => import("../Comments/Comments"));
const LazyIntroduction = lazy(() => import("../Introduction/Introduction"));
const LazyPersonAvatar = lazy(() => import("./Avatar"));
const LazyVideoList = lazy(() => import("../VideoList/VideoList"));

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: "",
      avatar: {}
    };
  }

  componentDidMount() {
    this.verifyId();
  }

  componentDidUpdate(prevProp) {
    if (this.props.vid !== prevProp.vid) {
      this.setState({ vid: this.props.vid });
    }
  }

  getVideoId = () => urlParse(globalHistory.location.href, true).query.vid;

  verifyId = () => {
    let { vid } = this.props;
    if (!vid) {
      vid = this.getVideoId();
    }
    if (!vid) {
      /* 视频ID不存在就返回主页; */
      return navigate("/");
    }
    this.setState({ vid: vid });
  };

  handleVideoInfo = data => {
    this.setState({ avatar: data });
  };

  render() {
    const { vid, avatar } = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <Suspense fallback={<div>Loading...</div>}>
              <LazyIntroduction vid={vid} />
            </Suspense>
            <Divider />
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComments vid={vid} />
            </Suspense>
          </Grid>
          <Grid item xs={3}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyPersonAvatar auth={avatar} />
              <br />
              <Divider />
              <LazyVideoList vid={vid} type="series" />
              <LazyVideoList vid={vid} type="recommend" />
            </Suspense>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Watch;
