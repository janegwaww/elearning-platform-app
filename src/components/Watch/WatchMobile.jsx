import React, { Component, Fragment } from "react";
import { Grid, Divider, Box, Tabs, Tab, Typography } from "@material-ui/core";
import LazyIntroduction from "../Introduction/Introduction";
import LazyPersonAvatar from "./Avatar";
import LazyVideoList from "../VideoList/VideoList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoDocumentGrid from "./VideoDocumentGrid";
import IntroductionText from "./IntroductionText";
import withId from "../EmptyNotice/withId";
import VideoPlayerTitle from "../VideoPlayer/VideoPlayerTitle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      pt={1}
      minHeight="30vh"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: {},
      value: 0,
    };
  }

  handleVideoInfo = (data) => {
    this.setState({ avatar: data });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const vid = this.props.id;
    const { avatar, value } = this.state;

    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12}>
            <VideoPlayer vid={vid} handleVideoInfo={this.handleVideoInfo} />
            <Box pt={2} pl={2} pr={2}>
              <VideoPlayerTitle title={avatar.title} variant="body1" />
              <LazyIntroduction intros={avatar} />
              <Divider />
              <LazyPersonAvatar auth={avatar} />
            </Box>
            <Box pl={2} pr={2} pb={2}>
              <Tabs
                value={value}
                onChange={this.handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <Tab label="进阶内容" />
                <Tab label="系列视频" />
                <Tab label="推荐视频" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    业内顶尖学者大咖亲自编撰，助您小步快跑
                  </Typography>
                  <VideoDocumentGrid vid={vid} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <VideoDocumentGrid vid={vid} type="series" />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <VideoDocumentGrid vid={vid} type="recommend" />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withId(Watch);
