import React, { Component, Fragment } from "react";
import { Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
/* import LazyComments from "../Comments/Comments"; */
import LazyIntroduction from "../Introduction/Introduction";
import LazyPersonAvatar from "./Avatar";
import LazyVideoList from "../VideoList/VideoList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoDocument from "./VideoDocument";
import ChipArray from "../Introduction/ChipArray";
import { getIdFromHref } from "../../services/utils";

const IntroductionText = ({ text }) => {
  return (
    <Paper elevation={4} style={{ boxShadow: "none", padding: "20px 0" }}>
      <Typography variant="body2" component="p">
        {text.description}
      </Typography>
      <br />
      <ChipArray chips={text.category} />
    </Paper>
  );
};

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: "",
      avatar: {},
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

  verifyId = () => {
    const { vid } = getIdFromHref();
    if (!vid) {
      alert("视频ID不存在");
    }
    this.setState({ vid });
  };

  handleVideoInfo = (data) => {
    this.setState({ avatar: data });
  };

  render() {
    const { vid, avatar } = this.state;

    return (
      <Fragment>
        <Grid container style={{ marginTop: 18 }} spacing={3}>
          <Grid item xs={12} sm={12} md={9}>
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <LazyIntroduction intros={avatar} />
            <Divider />
            <LazyPersonAvatar auth={avatar} />
            <IntroductionText text={avatar} />
            {/* <LazyComments vid={vid} /> */}
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

export default Watch;
