import React, { Component, Fragment } from "react";
import { globalHistory } from "@reach/router";
import { navigate } from "gatsby";
import { Grid, Divider } from "@material-ui/core";
import urlParse from "url-parse";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

import LazyComments from "../Comments/Comments";
import LazyIntroduction from "../Introduction/Introduction";
import LazyPersonAvatar from "./Avatar";
import LazyVideoList from "../VideoList/VideoList";

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
        <Grid container style={{ marginTop: 18 }}>
          <Grid item xs={9}>
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <LazyIntroduction vid={vid} />
            <Divider />
            <LazyComments vid={vid} />
          </Grid>
          <Grid item xs={3}>
            <LazyPersonAvatar auth={avatar} />
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

export default Watch;
