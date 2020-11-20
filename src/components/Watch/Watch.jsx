import React, { Component, Fragment } from "react";
import { Grid, Divider } from "@material-ui/core";
import LazyIntroduction from "../Introduction/Introduction";
import LazyPersonAvatar from "./Avatar";
import LazyVideoList from "../VideoList/VideoList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoDocument from "./VideoDocument";
import IntroductionText from "./IntroductionText";
import withId from "../EmptyNotice/withId";
import VideoPlayerTitle from "../VideoPlayer/VideoPlayerTitle";

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: {},
    };
    this.handleVideoInfo = this.handleVideoInfo.bind(this);
  }

  handleVideoInfo(data) {
    this.setState({ avatar: data });
  }

  render() {
    const vid = this.props.id;
    const { avatar } = this.state;

    return (
      <Fragment>
        <Grid container style={{ marginTop: 18 }} spacing={3}>
          <Grid item xs={12} sm={12} md={9}>
            <VideoPlayerTitle title={avatar.title} />
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <LazyIntroduction intros={avatar} />
            <Divider />
            <LazyPersonAvatar auth={avatar} />
            <IntroductionText text={avatar} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <br />
            <VideoDocument vid={vid} />
            <br />
            <Divider />
            <LazyVideoList vid={vid} type="series" />
            <LazyVideoList vid={vid} type="recommend" />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withId(Watch);
