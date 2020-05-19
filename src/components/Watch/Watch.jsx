import React, { Component, Fragment, lazy, Suspense } from "react";
import { globalHistory } from "@reach/router";
import { navigate } from "gatsby";
import { Grid, Divider } from "@material-ui/core";
import urlParse from "url-parse";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoList from "../VideoList/VideoList";
import PersonAvatar from "./Avatar.jsx";

const LazyComments = lazy(() => import("../Comments/Comments"));
const LazyIntroduction = lazy(() => import("../Introduction/Introduction"));

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: ""
    };
  }

  componentDidMount() {
    this.getVideoId();
  }

  getVideoId = () => {
    const videoId = urlParse(globalHistory.location.href, true).query.vid;
    if (!videoId) {
      /* 视频ID不存在就返回主页; */
      return navigate("/");
    }
    this.setState({ vid: videoId });
  };

  render() {
    const { vid } = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <VideoPlayer vid={vid} />
            <Suspense fallback={<div>Loading...</div>}>
              <LazyIntroduction vid={vid} />
            </Suspense>
            <Divider />
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComments vid={vid} />
            </Suspense>
          </Grid>
          <Grid item xs={3}>
            <PersonAvatar />
            <Divider />
            <VideoList />
            <br />
            <br />
            <Divider />
            <VideoList />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Watch;
