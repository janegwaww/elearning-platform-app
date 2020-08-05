import React, { Component, Fragment } from "react";
import { Grid, Divider, Box } from "@material-ui/core";
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
  }

  handleVideoInfo = (data) => {
    this.setState({ avatar: data });
  };

  render() {
    const vid = this.props.id;
    const { avatar } = this.state;

    return (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9}>
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <Box p={2}>
              <VideoPlayerTitle title={avatar.title} variant="body1" />
              <LazyIntroduction intros={avatar} />
              <Divider />
              <LazyPersonAvatar auth={avatar} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box pl={2} pr={2} pb={2}>
              <VideoDocument vid={vid} />
              <br />
              <Divider />
              <LazyVideoList vid={vid} type="series" />
              <LazyVideoList vid={vid} type="recommend" />
            </Box>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withId(Watch);
