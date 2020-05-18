import React, { Component, Fragment } from "react";
import { globalHistory, navigate } from "@reach/router";
import { Grid, Divider } from "@material-ui/core";
import urlParse from "url-parse";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Comments from "../Comments/Comments";
import VideoList from "../VideoList/VideoList";
import Introduction from "../Introduction/Introduction";
import PersonAvatar from "./Avatar.jsx";

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
            <Introduction />
            <Divider />
            <Comments vid={vid} />
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
