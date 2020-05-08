import React, { Component, Fragment } from "react";
import { globalHistory } from "@reach/router";
import { Grid, Divider } from "@material-ui/core";
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
    const href = globalHistory.location.href;
    this.setState({ vid: href });
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
            <div style={{ height: "1000px" }}>
              <Comments vid={vid} />
            </div>
          </Grid>
          <Grid item xs={3}>
            <PersonAvatar />
            <Divider />
            <div style={{ height: "800px" }}>
              <VideoList />
            </div>
            <Divider />
            <div style={{ height: "800px" }}>
              <VideoList />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Watch;
